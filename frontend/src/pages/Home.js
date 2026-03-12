import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EventCarousel from '../components/EventCarousel';
import API_BASE_URL from '../config/api';

const Home = () => {
  const [notifications, setNotifications] = useState([]);
  const [events, setEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [leadership, setLeadership] = useState({
    president: null,
    vicePresident: null
  });

  useEffect(() => {
    fetchNotifications();
    fetchEvents();
    fetchLeadership();
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/notifications`);
      setNotifications(res.data.slice(0, 5));
    } catch (err) {
      console.error(err);
    }
  };

  const fetchEvents = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/events`);
      const allEvents = res.data;
      
      // Separate upcoming and current events for carousel
      const now = new Date();
      const upcoming = allEvents.filter(event => new Date(event.date) >= now);
      
      setEvents(allEvents.slice(0, 3));
      setUpcomingEvents(upcoming.slice(0, 5)); // Top 5 for carousel
    } catch (err) {
      console.error(err);
    }
  };

  const fetchLeadership = async () => {
    try {
      console.log('Fetching leadership data...');
      const res = await axios.get(`${API_BASE_URL}/api/leadership`);
      console.log('Leadership data received:', res.data);
      const leaders = res.data;
      
      const president = leaders.find(leader => leader.position === 'president');
      const vicePresident = leaders.find(leader => leader.position === 'vice-president');
      
      console.log('President found:', president);
      console.log('Vice President found:', vicePresident);
      
      setLeadership({
        president,
        vicePresident
      });
    } catch (err) {
      console.error('Error fetching leadership:', err);
    }
  };

  return (
    <div>
      <section className="hero">
        <div className="container hero-content">
          {/* President Photo - Left Circle */}
          <div className="leader-photo left">
            {leadership.president ? (
              <>
                <img 
                  src={leadership.president.photo || '/president.jpg'} 
                  alt="President" 
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = '<div class="placeholder-circle"><span>President<br/>Photo</span></div>';
                  }} 
                />
                <p className="leader-name">{leadership.president.name}</p>
                <p className="leader-designation">PRESIDENT</p>
              </>
            ) : (
              <>
                <div className="placeholder-circle">
                  <span>President<br/>Photo</span>
                </div>
                <p className="leader-name">Loading...</p>
               
              </>
            )}
          </div>

          {/* Main Content */}
          <div className="hero-main">
            <h1>અખિલ ગુજરાત અગ્નિવીર સમિતિ</h1>
            <p>Building stronger communities through social service and unity</p>
            <a href="/member-register" className="btn">Join Our Community</a>
          </div>

          {/* Vice President Photo - Right Circle */}
          <div className="leader-photo right">
            {leadership.vicePresident ? (
              <>
                <img 
                  src={leadership.vicePresident.photo || '/vice-president.jpg'} 
                  alt="Vice President" 
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = '<div class="placeholder-circle"><span>Vice President<br/>Photo</span></div>';
                  }} 
                />
                <p className="leader-name">{leadership.vicePresident.name}</p>
                <p className="leader-designation">VICE PRESIDENT</p>
              </>
            ) : (
              <>
                <div className="placeholder-circle">
                  <span>Vice President<br/>Photo</span>
                </div>
                <p className="leader-name">Loading...</p>
               
              </>
            )}
          </div>
        </div>
      </section>

      {/* Event Carousel Section */}
      <section className="section" style={{ background: '#f8f9fa' }}>
        <div className="container">
          <h2 className="section-title">Featured Events</h2>
          <EventCarousel events={upcomingEvents} />
        </div>
      </section>

      {notifications.length > 0 && (
        <section className="section">
          <div className="container">
            <h2 className="section-title">Latest Announcements</h2>
            {notifications.map(notif => (
              <div key={notif._id} className="notification-panel">
                <h4>{notif.title}</h4>
                <p>{notif.message}</p>
                <small>{new Date(notif.createdAt).toLocaleDateString()}</small>
              </div>
            ))}
          </div>
        </section>
      )}

      {events.length > 0 && (
        <section className="section">
          <div className="container">
            <h2 className="section-title">Recent Events</h2>
            <div className="grid">
              {events.map(event => (
                <div key={event._id} className="event-card">
                  <div className="event-card-content">
                    <h3>{event.title}</h3>
                    <p>{event.description}</p>
                    <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
                    <p><strong>Location:</strong> {event.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
