import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ 
    districts: 0, 
    approvedDistricts: 0,
    pendingDistricts: 0,
    members: 0, 
    volunteers: 0, 
    events: 0 
  });
  const [districts, setDistricts] = useState([]);
  const [members, setMembers] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [leadership, setLeadership] = useState([]);
  const [districtStats, setDistrictStats] = useState({});
  const [showDistrictForm, setShowDistrictForm] = useState(false);
  const [showLeadershipForm, setShowLeadershipForm] = useState(false);
  const [showEventForm, setShowEventForm] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [districtForm, setDistrictForm] = useState({ name: '', districtCode: '', username: '', password: '' });
  const [leadershipForm, setLeadershipForm] = useState({
    position: 'president',
    name: '',
    photo: ''
  });
  const [eventForm, setEventForm] = useState({ 
    title: '', 
    description: '', 
    date: '', 
    location: '', 
    district: '',
    eventType: 'state' 
  });

  useEffect(() => {
    fetchData();
    fetchFeedback();
    fetchLeadership();
  }, []);

  const fetchLeadership = async () => {
    try {
      console.log('Admin: Fetching leadership data...');
      const res = await axios.get('/api/leadership');
      console.log('Admin: Leadership data received:', res.data);
      setLeadership(res.data);
    } catch (err) {
      console.error('Admin: Error fetching leadership:', err);
    }
  };

  const fetchData = async () => {
    const token = localStorage.getItem('token');
    const config = { headers: { 'x-auth-token': token } };

    try {
      console.log('Fetching admin dashboard data...');
      const [districtsRes, membersRes, volunteersRes, eventsRes] = await Promise.all([
        axios.get('/api/districts', config),
        axios.get('/api/members', config),
        axios.get('/api/volunteers', config),
        axios.get('/api/events', config)
      ]);

      console.log('Districts fetched:', districtsRes.data.length);
      console.log('Members fetched:', membersRes.data.length);
      console.log('Volunteers fetched:', volunteersRes.data.length);
      console.log('Events fetched:', eventsRes.data.length);

      setDistricts(districtsRes.data);
      setMembers(membersRes.data);
      
      // Calculate district-wise statistics
      const distStats = {};
      districtsRes.data.forEach(district => {
        const districtMembers = membersRes.data.filter(m => m.district && m.district._id === district._id);
        const districtVolunteers = volunteersRes.data.filter(v => v.district && v.district._id === district._id);
        
        distStats[district._id] = {
          members: districtMembers.length,
          volunteers: districtVolunteers.length,
          pendingMembers: districtMembers.filter(m => m.status === 'pending').length
        };
      });
      setDistrictStats(distStats);

      const statsData = {
        districts: districtsRes.data.length,
        approvedDistricts: districtsRes.data.filter(d => d.isApprovedByState).length,
        pendingDistricts: districtsRes.data.filter(d => !d.isApprovedByState).length,
        members: membersRes.data.length,
        volunteers: volunteersRes.data.length,
        events: eventsRes.data.length
      };
      
      console.log('Stats calculated:', statsData);
      setStats(statsData);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  const fetchFeedback = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get('/api/feedback/all', {
        headers: { 'x-auth-token': token }
      });
      setFeedback(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleApproveDistrict = async (districtId, isApproved) => {
    const token = localStorage.getItem('token');
    try {
      await axios.put(`/api/districts/${districtId}/approve`, 
        { isApprovedByState: isApproved },
        { headers: { 'x-auth-token': token } }
      );
      fetchData();
      alert(isApproved ? 'District approved successfully' : 'District approval revoked');
    } catch (err) {
      alert('Failed to update district approval');
    }
  };

  const handleAssignLeadership = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post('/api/leadership', 
        leadershipForm,
        { headers: { 'x-auth-token': token } }
      );
      setShowLeadershipForm(false);
      setLeadershipForm({
        position: 'president',
        name: '',
        photo: ''
      });
      fetchLeadership();
      alert('Leadership updated successfully');
    } catch (err) {
      alert('Failed to update leadership');
    }
  };

  const handleCreateDistrict = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    try {
      await axios.post('/api/districts', districtForm, {
        headers: { 'x-auth-token': token }
      });
      setShowDistrictForm(false);
      setDistrictForm({ name: '', districtCode: '', username: '', password: '' });
      fetchData();
    } catch (err) {
      alert('Failed to create district');
    }
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    try {
      await axios.post('/api/events', eventForm, {
        headers: { 'x-auth-token': token }
      });
      setShowEventForm(false);
      setEventForm({ title: '', description: '', date: '', location: '', district: '', eventType: 'state' });
      fetchData();
      alert('Event created successfully');
    } catch (err) {
      alert('Failed to create event');
    }
  };

  const downloadReport = async (type, districtId = null) => {
    const token = localStorage.getItem('token');
    const url = districtId 
      ? `/api/reports/${type}/${districtId}`
      : `/api/reports/${type}/all`;
    
    try {
      const res = await axios.get(url, {
        headers: { 'x-auth-token': token },
        responseType: 'blob'
      });
      
      const blob = new Blob([res.data], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = `${type}-report.pdf`;
      link.click();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h1>State Admin Dashboard</h1>
          <div>
            <button className="btn" onClick={() => navigate('/reports')} style={{ marginRight: '10px' }}>
              📊 View Reports
            </button>
            <button className="btn" onClick={() => setShowLeadershipForm(!showLeadershipForm)} style={{ marginRight: '10px' }}>
              Manage Leadership
            </button>
            <button className="btn" onClick={() => setShowEventForm(!showEventForm)} style={{ marginRight: '10px' }}>
              Add Event
            </button>
            <button className="btn" onClick={() => setShowDistrictForm(!showDistrictForm)}>
              Add District
            </button>
          </div>
        </div>

        <div className="dashboard-grid">
          <div className="stat-card">
            <h3>{stats.districts}</h3>
            <p>Total Districts</p>
          </div>
          <div className="stat-card">
            <h3>{stats.approvedDistricts}</h3>
            <p>Approved Districts</p>
          </div>
          <div className="stat-card">
            <h3>{stats.members}</h3>
            <p>Total Members</p>
          </div>
          <div className="stat-card">
            <h3>{stats.volunteers}</h3>
            <p>Total Volunteers</p>
          </div>
        </div>

        {/* Feedback Overview */}
        {feedback.length > 0 && (
          <div className="card">
            <h2>Recent Feedback ({feedback.length})</h2>
            <table>
              <thead>
                <tr>
                  <th>District</th>
                  <th>User</th>
                  <th>Rating</th>
                  <th>Message</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {feedback.slice(0, 10).map(fb => (
                  <tr key={fb._id}>
                    <td>{fb.district?.name}</td>
                    <td>{fb.userName}</td>
                    <td>
                      <span style={{ color: '#ffc107' }}>
                        {'★'.repeat(fb.rating)}
                      </span>
                    </td>
                    <td>{fb.message.substring(0, 40)}...</td>
                    <td>{fb.status}</td>
                    <td>{new Date(fb.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Leadership Management */}
        <div className="card">
          <h2>Current Leadership</h2>
          <div className="leadership-grid">
            {leadership.map(leader => (
              <div key={leader._id} className="leader-card">
                <div className="leader-photo-admin">
                  {leader.photo ? (
                    <img src={leader.photo} alt={leader.name} />
                  ) : (
                    <div className="placeholder-photo">No Photo</div>
                  )}
                </div>
                <h3>{leader.name}</h3>
                <p className="leader-position">{leader.position.toUpperCase().replace('-', ' ')}</p>
                <button 
                  className="btn btn-small"
                  onClick={() => {
                    setLeadershipForm({
                      position: leader.position,
                      name: leader.name,
                      photo: leader.photo || ''
                    });
                    setShowLeadershipForm(true);
                  }}
                >
                  Edit
                </button>
              </div>
            ))}
            {leadership.length === 0 && (
              <p>No leadership data found. Add leadership information below.</p>
            )}
          </div>
        </div>

        {showLeadershipForm && (
          <div className="card">
            <h2>Manage Leadership</h2>
            <form onSubmit={handleAssignLeadership}>
              <div className="form-group">
                <label>Position</label>
                <select 
                  value={leadershipForm.position}
                  onChange={(e) => setLeadershipForm({...leadershipForm, position: e.target.value})}
                  required
                >
                  <option value="president">President</option>
                  <option value="vice-president">Vice President</option>
                </select>
              </div>
              <div className="form-group">
                <label>Name</label>
                <input 
                  type="text" 
                  value={leadershipForm.name}
                  onChange={(e) => setLeadershipForm({...leadershipForm, name: e.target.value})}
                  required 
                />
              </div>
              <div className="form-group">
                <label>Photo URL</label>
                <input 
                  type="text" 
                  value={leadershipForm.photo}
                  onChange={(e) => setLeadershipForm({...leadershipForm, photo: e.target.value})}
                  placeholder="e.g., /president.jpg or https://example.com/photo.jpg"
                />
              </div>
              <button type="submit" className="btn">Update Leadership</button>
              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={() => setShowLeadershipForm(false)}
                style={{ marginLeft: '10px' }}
              >
                Cancel
              </button>
            </form>
          </div>
        )}

        {showEventForm && (
          <div className="card">
            <h2>Create New Event</h2>
            <form onSubmit={handleCreateEvent}>
              <div className="form-group">
                <label>Event Title</label>
                <input 
                  type="text" 
                  value={eventForm.title}
                  onChange={(e) => setEventForm({...eventForm, title: e.target.value})}
                  required 
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea 
                  value={eventForm.description}
                  onChange={(e) => setEventForm({...eventForm, description: e.target.value})}
                  required 
                  rows="3"
                />
              </div>
              <div className="form-group">
                <label>Event Type</label>
                <select 
                  value={eventForm.eventType}
                  onChange={(e) => setEventForm({...eventForm, eventType: e.target.value})}
                  required
                >
                  <option value="state">State Level Event</option>
                  <option value="district">District Level Event</option>
                </select>
              </div>
              <div className="form-group">
                <label>District (Optional for state events)</label>
                <select 
                  value={eventForm.district}
                  onChange={(e) => setEventForm({...eventForm, district: e.target.value})}
                >
                  <option value="">All Districts</option>
                  {districts.map(district => (
                    <option key={district._id} value={district._id}>
                      {district.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Date</label>
                <input 
                  type="date" 
                  value={eventForm.date}
                  onChange={(e) => setEventForm({...eventForm, date: e.target.value})}
                  required 
                />
              </div>
              <div className="form-group">
                <label>Location</label>
                <input 
                  type="text" 
                  value={eventForm.location}
                  onChange={(e) => setEventForm({...eventForm, location: e.target.value})}
                  required 
                />
              </div>
              <button type="submit" className="btn">Create Event</button>
              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={() => setShowEventForm(false)}
                style={{ marginLeft: '10px' }}
              >
                Cancel
              </button>
            </form>
          </div>
        )}

        {showDistrictForm && (
          <div className="card">
            <h2>Create New District</h2>
            <form onSubmit={handleCreateDistrict}>
              <div className="form-group">
                <label>District Name</label>
                <input 
                  type="text" 
                  value={districtForm.name}
                  onChange={(e) => setDistrictForm({...districtForm, name: e.target.value})}
                  required 
                />
              </div>
              <div className="form-group">
                <label>District Code (2 digits)</label>
                <input 
                  type="text" 
                  value={districtForm.districtCode}
                  onChange={(e) => setDistrictForm({...districtForm, districtCode: e.target.value})}
                  maxLength="2"
                  required 
                />
              </div>
              <div className="form-group">
                <label>Username</label>
                <input 
                  type="text" 
                  value={districtForm.username}
                  onChange={(e) => setDistrictForm({...districtForm, username: e.target.value})}
                  required 
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input 
                  type="password" 
                  value={districtForm.password}
                  onChange={(e) => setDistrictForm({...districtForm, password: e.target.value})}
                  required 
                />
              </div>
              <button type="submit" className="btn">Create District</button>
            </form>
          </div>
        )}

        <div className="card">
          <h2>All Districts ({stats.districts})</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Code</th>
                <th>President</th>
                <th>Members</th>
                <th>Volunteers</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {districts.map(district => (
                <tr key={district._id}>
                  <td>{district.name}</td>
                  <td>{district.districtCode}</td>
                  <td>{district.president?.name || 'Not assigned'}</td>
                  <td>{districtStats[district._id]?.members || 0}</td>
                  <td>{districtStats[district._id]?.volunteers || 0}</td>
                  <td>
                    <span style={{ 
                      color: district.isApprovedByState ? 'green' : 'orange',
                      fontWeight: 'bold'
                    }}>
                      {district.isApprovedByState ? '✓ Approved' : '⏳ Pending'}
                    </span>
                  </td>
                  <td>
                    {!district.isApprovedByState ? (
                      <button 
                        className="btn btn-success" 
                        onClick={() => handleApproveDistrict(district._id, true)}
                        style={{ marginRight: '5px' }}
                      >
                        Approve
                      </button>
                    ) : (
                      <button 
                        className="btn btn-danger" 
                        onClick={() => handleApproveDistrict(district._id, false)}
                        style={{ marginRight: '5px' }}
                      >
                        Revoke
                      </button>
                    )}
                    <button 
                      className="btn btn-secondary" 
                      onClick={() => downloadReport('members', district._id)}
                    >
                      Report
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="card">
          <h2>Pending Member Approvals</h2>
          <table>
            <thead>
              <tr>
                <th>Member ID</th>
                <th>Name</th>
                <th>District</th>
                <th>Phone</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {members.filter(m => m.status === 'pending').map(member => (
                <tr key={member._id}>
                  <td>{member.memberId}</td>
                  <td>{member.fullName}</td>
                  <td>{member.district?.name}</td>
                  <td>{member.phone}</td>
                  <td><span style={{ color: 'orange' }}>Pending</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
