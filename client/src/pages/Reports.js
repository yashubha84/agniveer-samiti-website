import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Reports = ({ user }) => {
  const [districts, setDistricts] = useState([]);
  const [statistics, setStatistics] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState('all');
  const [reportType, setReportType] = useState('members');
  const [limit, setLimit] = useState(100);
  const [status, setStatus] = useState('all');
  const [includeDetails, setIncludeDetails] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user.role === 'state_admin') {
      fetchDistricts();
      fetchStatistics();
    }
  }, [user.role]);

  const fetchDistricts = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get('/api/districts', {
        headers: { 'x-auth-token': token }
      });
      setDistricts(res.data);
    } catch (err) {
      console.error('Error fetching districts:', err);
    }
  };

  const fetchStatistics = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get('/api/reports/statistics/districts', {
        headers: { 'x-auth-token': token }
      });
      setStatistics(res.data);
    } catch (err) {
      console.error('Error fetching statistics:', err);
    }
  };

  const generateReport = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    
    try {
      const endpoint = reportType === 'members' 
        ? '/api/reports/members/custom'
        : '/api/reports/volunteers/custom';
      
      const payload = {
        districtId: user.role === 'district_admin' ? user.id : selectedDistrict,
        limit: parseInt(limit),
        status: reportType === 'members' ? status : undefined,
        includeDetails
      };

      const res = await axios.post(endpoint, payload, {
        headers: { 'x-auth-token': token },
        responseType: 'blob'
      });

      // Download PDF
      const blob = new Blob([res.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${reportType}-report-${Date.now()}.pdf`;
      link.click();
      window.URL.revokeObjectURL(url);
      
      alert('Report generated successfully!');
    } catch (err) {
      console.error('Error generating report:', err);
      alert('Failed to generate report');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard">
      <div className="container">
        <h1 className="section-title">Reports & Statistics</h1>

        {/* District-wise Statistics (State Admin Only) */}
        {user.role === 'state_admin' && statistics.length > 0 && (
          <div className="card">
            <h2>District-wise Statistics</h2>
            <div style={{ overflowX: 'auto' }}>
              <table>
                <thead>
                  <tr>
                    <th>District</th>
                    <th>Code</th>
                    <th>Total Members</th>
                    <th>Approved</th>
                    <th>Pending</th>
                    <th>Volunteers</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {statistics.map(stat => (
                    <tr key={stat.districtId}>
                      <td><strong>{stat.districtName}</strong></td>
                      <td>{stat.districtCode}</td>
                      <td>{stat.totalMembers}</td>
                      <td style={{ color: '#10b981' }}>{stat.approvedMembers}</td>
                      <td style={{ color: '#f59e0b' }}>{stat.pendingMembers}</td>
                      <td>{stat.totalVolunteers}</td>
                      <td>
                        <button 
                          className="btn btn-secondary"
                          onClick={() => {
                            setSelectedDistrict(stat.districtId);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          style={{ fontSize: '12px', padding: '5px 10px' }}
                        >
                          Generate Report
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Report Generation Form */}
        <div className="card">
          <h2>Generate Custom Report</h2>
          <p style={{ color: '#666', marginBottom: '20px' }}>
            Create professional PDF reports with letterhead, logo, and authorized signature
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
            {/* District Selection (State Admin Only) */}
            {user.role === 'state_admin' && (
              <div className="form-group">
                <label>Select District</label>
                <select 
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                >
                  <option value="all">All Districts</option>
                  {districts.map(district => (
                    <option key={district._id} value={district._id}>
                      {district.name} ({district.districtCode})
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Report Type */}
            <div className="form-group">
              <label>Report Type</label>
              <select 
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
              >
                <option value="members">Members Report</option>
                <option value="volunteers">Volunteers Report</option>
              </select>
            </div>

            {/* Status Filter (Members Only) */}
            {reportType === 'members' && (
              <div className="form-group">
                <label>Member Status</label>
                <select 
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="approved">Approved Only</option>
                  <option value="pending">Pending Only</option>
                  <option value="rejected">Rejected Only</option>
                </select>
              </div>
            )}

            {/* Limit */}
            <div className="form-group">
              <label>Number of Records</label>
              <select 
                value={limit}
                onChange={(e) => setLimit(e.target.value)}
              >
                <option value="10">10 Records</option>
                <option value="25">25 Records</option>
                <option value="50">50 Records</option>
                <option value="100">100 Records</option>
                <option value="200">200 Records</option>
                <option value="500">500 Records</option>
                <option value="1000">All Records</option>
              </select>
            </div>
          </div>

          {/* Include Details Checkbox */}
          {reportType === 'members' && (
            <div className="form-group" style={{ marginBottom: '20px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input 
                  type="checkbox"
                  checked={includeDetails}
                  onChange={(e) => setIncludeDetails(e.target.checked)}
                  style={{ width: 'auto' }}
                />
                Include detailed information (email, address, occupation)
              </label>
            </div>
          )}

          {/* Report Preview Info */}
          <div style={{ 
            background: '#f8f9fa', 
            padding: '15px', 
            borderRadius: '8px', 
            marginBottom: '20px',
            border: '1px solid #e0e0e0'
          }}>
            <h4 style={{ marginTop: 0, color: '#667eea' }}>Report Will Include:</h4>
            <ul style={{ marginBottom: 0, paddingLeft: '20px' }}>
              <li>✅ Professional letterhead with logo</li>
              <li>✅ Organization name (Gujarati & English)</li>
              <li>✅ President and Vice President names</li>
              <li>✅ District information</li>
              <li>✅ Detailed data table</li>
              <li>✅ Authorized signature with designation</li>
              <li>✅ Generation date and time</li>
              <li>✅ Page numbers</li>
            </ul>
          </div>

          {/* Generate Button */}
          <button 
            className="btn"
            onClick={generateReport}
            disabled={loading}
            style={{ width: '100%', padding: '12px', fontSize: '16px' }}
          >
            {loading ? 'Generating Report...' : '📄 Generate PDF Report'}
          </button>
        </div>

        {/* Instructions */}
        <div className="card" style={{ background: '#f0f9ff', border: '1px solid #667eea' }}>
          <h3 style={{ color: '#667eea', marginTop: 0 }}>📋 How to Use</h3>
          <ol style={{ paddingLeft: '20px', lineHeight: '1.8' }}>
            <li><strong>Select District:</strong> Choose specific district or "All Districts" (State Admin only)</li>
            <li><strong>Choose Report Type:</strong> Members or Volunteers</li>
            <li><strong>Filter Data:</strong> Select status and number of records</li>
            <li><strong>Include Details:</strong> Check box for additional information</li>
            <li><strong>Generate:</strong> Click button to download professional PDF</li>
          </ol>
          
          <h4 style={{ color: '#667eea', marginTop: '20px' }}>📝 Report Features:</h4>
          <ul style={{ paddingLeft: '20px', lineHeight: '1.8' }}>
            <li>Professional letterhead design</li>
            <li>Automatic pagination</li>
            <li>Color-coded status indicators</li>
            <li>Authorized signature section</li>
            <li>Ready for official use</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Reports;
