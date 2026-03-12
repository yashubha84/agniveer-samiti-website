import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GUJARAT_DISTRICTS } from '../components/DistrictsList';

const MemberRegister = () => {
  // Initialize with static districts immediately
  const [districts, setDistricts] = useState(
    GUJARAT_DISTRICTS.map(d => ({ _id: d.code, name: d.name, districtCode: d.code }))
  );
  const [formData, setFormData] = useState({
    fullName: '',
    armyNumber: '',
    district: '',
    phone: '',
    email: '',
    address: '',
    occupation: '',
    password: '',
    confirmPassword: ''
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
    
    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match!');
      return;
    }

    // Validate password length
    if (formData.password.length < 6) {
      setMessage('Password must be at least 6 characters long!');
      return;
    }

    try {
      const { confirmPassword, ...submitData } = formData;
      const res = await axios.post('/api/members/register', submitData);
      setMessage(`Success! Your Member ID is ${res.data.memberId}. Please save your Army Number and Mobile Number for login. Awaiting approval.`);
      setFormData({ 
        fullName: '', 
        armyNumber: '',
        district: '', 
        phone: '', 
        email: '', 
        address: '', 
        occupation: '',
        password: '',
        confirmPassword: ''
      });
    } catch (err) {
      setMessage(err.response?.data?.error || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="section">
      <div className="container">
        <h1 className="section-title">Member Registration</h1>
        <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
          {message && <div className={`alert ${message.includes('Success') ? 'alert-success' : 'alert-error'}`}>{message}</div>}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name *</label>
              <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Army Number * (Required for login)</label>
              <input 
                type="text" 
                name="armyNumber" 
                value={formData.armyNumber} 
                onChange={handleChange} 
                placeholder="Enter your army service number"
                required 
              />
              <small style={{ color: '#666', display: 'block', marginTop: '5px' }}>
                This will be used for login along with your mobile number
              </small>
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
              <label>Mobile Number * (Required for login)</label>
              <input 
                type="tel" 
                name="phone" 
                value={formData.phone} 
                onChange={handleChange} 
                placeholder="10-digit mobile number"
                pattern="[0-9]{10}"
                required 
              />
              <small style={{ color: '#666', display: 'block', marginTop: '5px' }}>
                This will be used for login along with your army number
              </small>
            </div>
            
            <div className="form-group">
              <label>Email *</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            
            <div className="form-group">
              <label>Address *</label>
              <textarea name="address" value={formData.address} onChange={handleChange} required rows="3"></textarea>
            </div>
            
            <div className="form-group">
              <label>Occupation</label>
              <input type="text" name="occupation" value={formData.occupation} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Create Password * (Minimum 6 characters)</label>
              <input 
                type="password" 
                name="password" 
                value={formData.password} 
                onChange={handleChange} 
                minLength="6"
                required 
              />
            </div>

            <div className="form-group">
              <label>Confirm Password *</label>
              <input 
                type="password" 
                name="confirmPassword" 
                value={formData.confirmPassword} 
                onChange={handleChange} 
                minLength="6"
                required 
              />
            </div>
            
            <button type="submit" className="btn">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MemberRegister;
