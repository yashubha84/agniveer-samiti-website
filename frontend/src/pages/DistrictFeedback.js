import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GUJARAT_DISTRICTS } from '../components/DistrictsList';

const DistrictFeedback = () => {
  // Initialize with static districts immediately
  const [districts, setDistricts] = useState(
    GUJARAT_DISTRICTS.map(d => ({ _id: d.code, name: d.name, districtCode: d.code }))
  );
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [formData, setFormData] = useState({
    userName: '',
    userEmail: '',
    userPhone: '',
    rating: 5,
    message: ''
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDistricts();
  }, []);

  const fetchDistricts = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/districts');
      if (res.data && res.data.length > 0) {
        // Sort districts alphabetically by name
        const sortedDistricts = res.data.sort((a, b) => a.name.localeCompare(b.name));
        setDistricts(sortedDistricts);
      }
    } catch (err) {
      console.log('Using static district list (MongoDB not connected)');
      // Keep the static list that was already set
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDistrict) {
      setMessage('Please select a district');
      return;
    }

    try {
      await axios.post('/api/feedback', {
        ...formData,
        district: selectedDistrict
      });
      setMessage('Thank you for your feedback!');
      setFormData({ userName: '', userEmail: '', userPhone: '', rating: 5, message: '' });
      setSelectedDistrict('');
    } catch (err) {
      setMessage('Failed to submit feedback. Please try again.');
    }
  };

  return (
    <div className="section">
      <div className="container">
        <h1 className="section-title">District Feedback</h1>
        <div className="card" style={{ maxWidth: '700px', margin: '0 auto' }}>
          <p style={{ marginBottom: '20px', color: '#666' }}>
            Share your experience and feedback about your district committee. Your feedback helps us improve our services.
          </p>

          {message && (
            <div className={`alert ${message.includes('Thank') ? 'alert-success' : 'alert-error'}`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Select District * (Choose from all 33 districts of Gujarat)</label>
              <select 
                value={selectedDistrict} 
                onChange={(e) => setSelectedDistrict(e.target.value)}
                required
                style={{ fontSize: '14px' }}
              >
                <option value="">-- Choose a District --</option>
                {districts.map(d => (
                  <option key={d._id || d.districtCode} value={d._id}>
                    {d.name} District
                  </option>
                ))}
              </select>
              <small style={{ color: '#666', display: 'block', marginTop: '5px' }}>
                {districts.length} districts available
                {loading && ' (updating...)'}
              </small>
            </div>

            <div className="form-group">
              <label>Your Name *</label>
              <input 
                type="text" 
                name="userName" 
                value={formData.userName} 
                onChange={handleChange} 
                required 
              />
            </div>

            <div className="form-group">
              <label>Email *</label>
              <input 
                type="email" 
                name="userEmail" 
                value={formData.userEmail} 
                onChange={handleChange} 
                required 
              />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input 
                type="tel" 
                name="userPhone" 
                value={formData.userPhone} 
                onChange={handleChange} 
              />
            </div>

            <div className="form-group">
              <label>Rating *</label>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormData({ ...formData, rating: star })}
                    style={{
                      fontSize: '2rem',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: star <= formData.rating ? '#ffc107' : '#ddd'
                    }}
                  >
                    ★
                  </button>
                ))}
                <span style={{ marginLeft: '10px', color: '#666' }}>
                  {formData.rating} / 5
                </span>
              </div>
            </div>

            <div className="form-group">
              <label>Your Feedback *</label>
              <textarea 
                name="message" 
                value={formData.message} 
                onChange={handleChange} 
                required 
                rows="5"
                placeholder="Share your experience, suggestions, or concerns..."
              />
            </div>

            <button type="submit" className="btn" style={{ width: '100%' }}>
              Submit Feedback
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DistrictFeedback;
