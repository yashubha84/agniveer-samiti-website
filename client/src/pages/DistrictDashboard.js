import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const DistrictDashboard = ({ user }) => {
  const navigate = useNavigate();
  const [districtInfo, setDistrictInfo] = useState(null);
  const [members, setMembers] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [events, setEvents] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [stats, setStats] = useState({
    totalMembers: 0,
    pendingMembers: 0,
    approvedMembers: 0,
    rejectedMembers: 0,
    totalVolunteers: 0
  });
  const [showEventForm, setShowEventForm] = useState(false);
  const [showNotificationForm, setShowNotificationForm] = useState(false);
  const [eventForm, setEventForm] = useState({ title: '', description: '', date: '', location: '' });
  const [notificationForm, setNotificationForm] = useState({ title: '', message: '', type: 'district', priority: 'medium' });

  useEffect(() => {
    fetchDistrictInfo();
    fetchData();
    fetchFeedback();
  }, []);

  const fetchDistrictInfo = async () => {
    const token = localStorage.getItem('token');
    const config = { headers: { 'x-auth-token': token } };

    try {
      console.log('Fetching district info for:', user.id);
      const res = await axios.get(`/api/districts/${user.id}`, config);
      console.log('District info fetched:', res.data);
      setDistrictInfo(res.data);
    } catch (err) {
      console.error('Error fetching district info:', err);
    }
  };

  const fetchData = async () => {
    const token = localStorage.getItem('token');
    const config = { headers: { 'x-auth-token': token } };

    try {
      console.log('Fetching district dashboard data...');
      const [membersRes, volunteersRes, eventsRes] = await Promise.all([
        axios.get('/api/members', config),
        axios.get('/api/volunteers', config),
        axios.get('/api/events', config)
      ]);

      console.log('Members fetched:', membersRes.data.length);
      console.log('Volunteers fetched:', volunteersRes.data.length);
      console.log('Events fetched:', eventsRes.data.length);

      setMembers(membersRes.data);
      setVolunteers(volunteersRes.data);
      setEvents(eventsRes.data);

      // Calculate stats
      setStats({
        totalMembers: membersRes.data.length,
        pendingMembers: membersRes.data.filter(m => m.status === 'pending').length,
        approvedMembers: membersRes.data.filter(m => m.status === 'approved').length,
        rejectedMembers: membersRes.data.filter(m => m.status === 'rejected').length,
        totalVolunteers: volunteersRes.data.length
      });
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  const fetchFeedback = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get('/api/feedback/district', {
        headers: { 'x-auth-token': token }
      });
      setFeedback(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleRespondFeedback = async (feedbackId, response, status) => {
    const token = localStorage.getItem('token');
    try {
      await axios.put(`/api/feedback/${feedbackId}/respond`, 
        { response, status },
        { headers: { 'x-auth-token': token } }
      );
      fetchFeedback();
      alert('Response submitted successfully');
    } catch (err) {
      alert('Failed to respond to feedback');
    }
  };

  const handleApproveMember = async (memberId, status) => {
    const token = localStorage.getItem('token');
    
    try {
      await axios.put(`/api/members/${memberId}/status`, { status }, {
        headers: { 'x-auth-token': token }
      });
      
      // Show success message
      const statusText = status === 'approved' ? 'approved' : 'rejected';
      alert(`Member ${statusText} successfully!`);
      
      // Refresh data
      fetchData();
    } catch (err) {
      console.error('Error updating member status:', err);
      alert('Failed to update member status');
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
      setEventForm({ title: '', description: '', date: '', location: '' });
      fetchData();
      alert('Event created successfully for your district');
    } catch (err) {
      alert('Failed to create event');
    }
  };

  const handleCreateNotification = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    try {
      await axios.post('/api/notifications', notificationForm, {
        headers: { 'x-auth-token': token }
      });
      setShowNotificationForm(false);
      setNotificationForm({ title: '', message: '', type: 'district', priority: 'medium' });
      alert('Notification sent successfully');
    } catch (err) {
      alert('Failed to send notification');
    }
  };

  const downloadReport = async (type) => {
    const token = localStorage.getItem('token');
    
    try {
      const res = await axios.get(`/api/reports/${type}/${user.id}`, {
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
          <h1>District Dashboard - {districtInfo?.name || user.name}</h1>
          <div>
            <button className="btn btn-secondary" onClick={() => navigate('/reports')} style={{ marginRight: '10px' }}>
              📊 Reports
            </button>
            <button className="btn" onClick={() => setShowEventForm(!showEventForm)} style={{ marginRight: '10px' }}>
              Add Event
            </button>
            <button className="btn btn-secondary" onClick={() => setShowNotificationForm(!showNotificationForm)}>
              Send Notification
            </button>
          </div>
        </div>

        {/* District Admin Information */}
        {districtInfo && (
          <div className="card">
            <h2>District Information</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <p><strong>District Name:</strong> {districtInfo.name}</p>
                <p><strong>District Code:</strong> {districtInfo.districtCode}</p>
                <p><strong>Username:</strong> {districtInfo.username}</p>
                <p><strong>Status:</strong> 
                  <span style={{ 
                    color: districtInfo.isApprovedByState ? 'green' : 'orange',
                    fontWeight: 'bold',
                    marginLeft: '5px'
                  }}>
                    {districtInfo.isApprovedByState ? '✓ Approved by State' : '⏳ Pending State Approval'}
                  </span>
                </p>
              </div>
              <div>
                {districtInfo.president?.name && (
                  <div>
                    <p><strong>President:</strong> {districtInfo.president.name}</p>
                    {districtInfo.president.phone && <p><strong>Phone:</strong> {districtInfo.president.phone}</p>}
                  </div>
                )}
                {districtInfo.vicePresident?.name && (
                  <div style={{ marginTop: '10px' }}>
                    <p><strong>Vice President:</strong> {districtInfo.vicePresident.name}</p>
                    {districtInfo.vicePresident.phone && <p><strong>Phone:</strong> {districtInfo.vicePresident.phone}</p>}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="dashboard-grid">
          <div className="stat-card">
            <h3>{stats.approvedMembers}</h3>
            <p>Approved Members</p>
          </div>
          <div className="stat-card">
            <h3>{stats.pendingMembers}</h3>
            <p>Pending Approvals</p>
          </div>
          <div className="stat-card">
            <h3>{stats.totalVolunteers}</h3>
            <p>Volunteers</p>
          </div>
          <div className="stat-card">
            <h3>{events.length}</h3>
            <p>Events</p>
          </div>
        </div>

        {/* Feedback Section */}
        {feedback.length > 0 && (
          <div className="card">
            <h2>District Feedback ({feedback.length})</h2>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Rating</th>
                  <th>Message</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {feedback.map(fb => (
                  <tr key={fb._id}>
                    <td>{fb.userName}</td>
                    <td>
                      <span style={{ color: '#ffc107' }}>
                        {'★'.repeat(fb.rating)}{'☆'.repeat(5 - fb.rating)}
                      </span>
                    </td>
                    <td>{fb.message.substring(0, 50)}...</td>
                    <td>
                      <span style={{ 
                        color: fb.status === 'resolved' ? 'green' : 
                               fb.status === 'reviewed' ? 'orange' : 'gray' 
                      }}>
                        {fb.status}
                      </span>
                    </td>
                    <td>{new Date(fb.createdAt).toLocaleDateString()}</td>
                    <td>
                      {fb.status === 'pending' && (
                        <button 
                          className="btn btn-secondary"
                          onClick={() => {
                            const response = prompt('Enter your response:');
                            if (response) {
                              handleRespondFeedback(fb._id, response, 'reviewed');
                            }
                          }}
                        >
                          Respond
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {showEventForm && (
          <div className="card">
            <h2>Create New Event for {user.name}</h2>
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

        {showNotificationForm && (
          <div className="card">
            <h2>Send Notification</h2>
            <form onSubmit={handleCreateNotification}>
              <div className="form-group">
                <label>Title</label>
                <input 
                  type="text" 
                  value={notificationForm.title}
                  onChange={(e) => setNotificationForm({...notificationForm, title: e.target.value})}
                  required 
                />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea 
                  value={notificationForm.message}
                  onChange={(e) => setNotificationForm({...notificationForm, message: e.target.value})}
                  required 
                  rows="3"
                />
              </div>
              <div className="form-group">
                <label>Priority</label>
                <select 
                  value={notificationForm.priority}
                  onChange={(e) => setNotificationForm({...notificationForm, priority: e.target.value})}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <button type="submit" className="btn">Send Notification</button>
            </form>
          </div>
        )}

        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2>Pending Member Approvals ({stats.pendingMembers})</h2>
            <button className="btn btn-secondary" onClick={() => downloadReport('members')}>
              Download Report
            </button>
          </div>
          {members.filter(m => m.status === 'pending').length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Member ID</th>
                  <th>Name</th>
                  <th>Army Number</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Occupation</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {members.filter(m => m.status === 'pending').map(member => (
                  <tr key={member._id}>
                    <td>{member.memberId}</td>
                    <td>{member.fullName}</td>
                    <td><strong>{member.armyNumber}</strong></td>
                    <td>{member.phone}</td>
                    <td>{member.email}</td>
                    <td>{member.address}</td>
                    <td>{member.occupation || '-'}</td>
                    <td>
                      <button 
                        className="btn btn-success" 
                        onClick={() => handleApproveMember(member._id, 'approved')}
                        style={{ marginRight: '5px', fontSize: '12px', padding: '5px 10px' }}
                      >
                        ✓ Approve
                      </button>
                      <button 
                        className="btn btn-danger" 
                        onClick={() => handleApproveMember(member._id, 'rejected')}
                        style={{ fontSize: '12px', padding: '5px 10px' }}
                      >
                        ✗ Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
              No pending member approvals
            </p>
          )}
        </div>

        {/* Approved Members Section */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2>Approved Members ({stats.approvedMembers})</h2>
          </div>
          {members.filter(m => m.status === 'approved').length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Member ID</th>
                  <th>Name</th>
                  <th>Army Number</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Approved Date</th>
                </tr>
              </thead>
              <tbody>
                {members.filter(m => m.status === 'approved').slice(0, 10).map(member => (
                  <tr key={member._id}>
                    <td>{member.memberId}</td>
                    <td>{member.fullName}</td>
                    <td>{member.armyNumber}</td>
                    <td>{member.phone}</td>
                    <td>{member.email}</td>
                    <td>{member.approvedAt ? new Date(member.approvedAt).toLocaleDateString() : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
              No approved members yet
            </p>
          )}
        </div>

        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2>Volunteers ({stats.totalVolunteers})</h2>
            <button className="btn btn-secondary" onClick={() => downloadReport('volunteers')}>
              Download Report
            </button>
          </div>
          <table>
            <thead>
              <tr>
                <th>Volunteer ID</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Skills</th>
                <th>Availability</th>
              </tr>
            </thead>
            <tbody>
              {volunteers.map(volunteer => (
                <tr key={volunteer._id}>
                  <td>{volunteer.volunteerId}</td>
                  <td>{volunteer.name}</td>
                  <td>{volunteer.phone}</td>
                  <td>{volunteer.skills.join(', ')}</td>
                  <td>{volunteer.availability}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DistrictDashboard;
