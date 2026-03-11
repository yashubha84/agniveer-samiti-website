import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get('/api/events');
      setEvents(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="section">
      <div className="container">
        <h1 className="section-title">Events</h1>
        <div className="grid">
          {events.map(event => (
            <div key={event._id} className="event-card">
              {event.photos && event.photos.length > 0 && (
                <div className="event-photos">
                  <img 
                    src={event.photos[0]} 
                    alt={event.title}
                    className="event-main-photo"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                  {event.photos.length > 1 && (
                    <div className="photo-count">
                      +{event.photos.length - 1} more
                    </div>
                  )}
                </div>
              )}
              <div className="event-card-content">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
                <p><strong>Location:</strong> {event.location}</p>
                {event.district && <p><strong>District:</strong> {event.district.name}</p>}
                {event.photos && event.photos.length > 0 && (
                  <div className="event-photo-gallery">
                    {event.photos.slice(1, 4).map((photo, index) => (
                      <img 
                        key={index}
                        src={photo} 
                        alt={`${event.title} ${index + 2}`}
                        className="event-thumbnail"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;
