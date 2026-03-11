import React, { useState, useEffect } from 'react';
import './EventCarousel.css';

const EventCarousel = ({ events }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (events.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === events.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [events.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? events.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === events.length - 1 ? 0 : currentIndex + 1);
  };

  if (events.length === 0) {
    return (
      <div className="carousel-empty">
        <p>No upcoming events at the moment</p>
      </div>
    );
  }

  const currentEvent = events[currentIndex];
  const eventDate = new Date(currentEvent.date);
  const isUpcoming = eventDate > new Date();

  return (
    <div className="carousel-container">
      <div className="carousel-slide">
        <div className="carousel-content">
          <div className="carousel-badge">
            {isUpcoming ? '🔔 Upcoming Event' : '✨ Current Event'}
          </div>
          <h2 className="carousel-title">{currentEvent.title}</h2>
          <p className="carousel-description">{currentEvent.description}</p>
          <div className="carousel-details">
            <div className="carousel-detail-item">
              <span className="detail-icon">📅</span>
              <span>{eventDate.toLocaleDateString('en-IN', { 
                day: 'numeric', 
                month: 'long', 
                year: 'numeric' 
              })}</span>
            </div>
            <div className="carousel-detail-item">
              <span className="detail-icon">📍</span>
              <span>{currentEvent.location}</span>
            </div>
            {currentEvent.district && (
              <div className="carousel-detail-item">
                <span className="detail-icon">🏛️</span>
                <span>{currentEvent.district.name} District</span>
              </div>
            )}
          </div>
          {isUpcoming && (
            <button className="carousel-join-btn">
              Join as Volunteer
            </button>
          )}
        </div>
        
        {events.length > 1 && (
          <>
            <button className="carousel-btn carousel-btn-prev" onClick={goToPrevious}>
              ‹
            </button>
            <button className="carousel-btn carousel-btn-next" onClick={goToNext}>
              ›
            </button>
          </>
        )}
      </div>

      {events.length > 1 && (
        <div className="carousel-indicators">
          {events.map((_, index) => (
            <button
              key={index}
              className={`carousel-indicator ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default EventCarousel;
