import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GUJARAT_DISTRICTS } from '../components/DistrictsList';

const VolunteerRegister = () => {
  // Initialize with static districts immediately
  const [districts, setDistricts] = useState(
    GUJARAT_DISTRICTS.map(d => ({ _id: d.code, name: d.name, districtCode: d.code }))
  );
  const [formData, setFormData] = useState({
    name: '',
    district: '',
    phone: '',
    email: '',
    skills: '',
    availability: 'both'
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
    try {
      const data = { ...formData, skills: formData.skills.split(',').map(s => s.trim()) };
      const res = await axios.post('/api/volunteers/register', data);
      setMessage(`Success! Your Volunteer ID is ${res.data.volunteerId}`);
      setFormData({ name: '', district: '', phone: '', email: '', skills: '', availability: 'both' });
    } catch (err) {
      setMessage('Registration failed. Please try again.');
    }
  };

  return (
    <div className="section">
      <div className="container">
        <h1 className="section-title">Volunteer Registration</h1>
        <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
          {message && <div className={`alert ${message.includes('Success') ? 'alert-success' : 'alert-error'}`}>{message}</div>}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name *</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            
            <div className="form-group">
              <label>District * (Select your district from all 33 districts of Gujarat)</label>
              <select 
                name="district" 
                value={formData.district} 
                onChange={handleChange} 
                required
                style={{ fontSize: '14px' }}
              >
                <option value="">-- Select Your District --</option>
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
              <label>Phone Number *</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
            </div>
            
            <div className="form-group">
              <label>Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} />
            </div>
            
            <div className="form-group">
              <label>Skills (comma separated)</label>
              <input type="text" name="skills" value={formData.skills} onChange={handleChange} placeholder="e.g., First Aid, Teaching, Event Management" />
            </div>
            
            <div className="form-group">
              <label>Availability *</label>
              <select name="availability" value={formData.availability} onChange={handleChange} required>
                <option value="weekdays">Weekdays</option>
                <option value="weekends">Weekends</option>
                <option value="both">Both</option>
              </select>
            </div>
            
            <button type="submit" className="btn">Register as Volunteer</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VolunteerRegister;
