import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MemberDashboard = ({ user }) => {
  const [memberInfo, setMemberInfo] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMemberData();
    fetchEvents();
  }, []);

  const fetchMemberData = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get(`/api/members/${user.id}`, {
        headers: { 'x-auth-token': token }
      });
      setMemberInfo(res.data);
    } catch (err) {
      console.error('Error fetching member data:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchEvents = async () => {
    try {
      const res = await axios.get('/api/events');
      setEvents(res.data);
    } catch (err) {
      console.error('Error fetching events:', err);
    }
  };

  if (loading) {
    return (
      <div className="section">
        <div className="container">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h1>Member Dashboard</h1>
        </div>

        <div className="card">
          <h2>Your Profile</h2>
          {memberInfo && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div>
                <p><strong>Member ID:</strong> {memberInfo.memberId}</p>
                <p><strong>Name:</strong> {memberInfo.fullName}</p>
                <p><strong>Army Number:</strong> {memberInfo.armyNumber}</p>
                <p><strong>District:</strong> {memberInfo.district?.name}</p>
              </div>
              <div>
                <p><strong>Phone:</strong> {memberInfo.phone}</p>
                <p><strong>Email:</strong> {memberInfo.email}</p>
                <p><strong>Status:</strong> 
                  <span style={{ 
                    color: memberInfo.status === 'approved' ? 'green' : 
                           memberInfo.status === 'pending' ? 'orange' : 'red',
                    fontWeight: 'bold',
                    marginLeft: '5px'
                  }}>
                    {memberInfo.status.toUpperCase()}
                  </span>
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="card">
          <h2>Upcoming Events</h2>
          {events.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Event</th>
                  <th>Date</th>
                  <th>Location</th>
                  <th>District</th>
                </tr>
              </thead>
              <tbody>
                {events.slice(0, 10).map(event => (
                  <tr key={event._id}>
                    <td>{event.title}</td>
                    <td>{new Date(event.date).toLocaleDateString()}</td>
                    <td>{event.location}</td>
                    <td>{event.district?.name || 'All Districts'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No upcoming events</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MemberDashboard;
