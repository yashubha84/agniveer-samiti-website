import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({ setUser }) => {
  const [loginType, setLoginType] = useState('member');
  const [formData, setFormData] = useState({ 
    username: '', 
    password: '',
    armyNumber: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      let endpoint = '';
      let payload = {};

      if (loginType === 'admin') {
        endpoint = '/api/auth/admin/login';
        payload = { username: formData.username, password: formData.password };
      } else if (loginType === 'district') {
        endpoint = '/api/auth/district/login';
        payload = { username: formData.username, password: formData.password };
      } else if (loginType === 'member') {
        endpoint = '/api/auth/member/login';
        payload = { armyNumber: formData.armyNumber, password: formData.password };
      }

      const res = await axios.post(endpoint, payload);
      
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setUser(res.data.user);
      
      if (res.data.user.role === 'state_admin') {
        navigate('/admin-dashboard');
      } else if (res.data.user.role === 'district_admin') {
        navigate('/district-dashboard');
      } else if (res.data.user.role === 'member') {
        navigate('/member-dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.msg || 'Login failed');
    }
  };

  return (
    <div className="section">
      <div className="container">
        <h1 className="section-title">Login</h1>
        <div className="card" style={{ maxWidth: '500px', margin: '0 auto' }}>
          <div style={{ marginBottom: '20px', textAlign: 'center' }}>
            <button 
              className={`btn ${loginType === 'member' ? '' : 'btn-secondary'}`}
              onClick={() => setLoginType('member')}
              style={{ marginRight: '10px', fontSize: '14px', padding: '8px 15px' }}
            >
              Member Login
            </button>
            <button 
              className={`btn ${loginType === 'district' ? '' : 'btn-secondary'}`}
              onClick={() => setLoginType('district')}
              style={{ marginRight: '10px', fontSize: '14px', padding: '8px 15px' }}
            >
              District Admin
            </button>
            <button 
              className={`btn ${loginType === 'admin' ? '' : 'btn-secondary'}`}
              onClick={() => setLoginType('admin')}
              style={{ fontSize: '14px', padding: '8px 15px' }}
            >
              State Admin
            </button>
          </div>

          {error && <div className="alert alert-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            {loginType === 'member' ? (
              <>
                <div className="form-group">
                  <label>Army Number *</label>
                  <input 
                    type="text" 
                    name="armyNumber" 
                    value={formData.armyNumber} 
                    onChange={handleChange} 
                    placeholder="Enter your army number"
                    required 
                  />
                </div>
                
                <div className="form-group">
                  <label>Password *</label>
                  <input 
                    type="password" 
                    name="password" 
                    value={formData.password} 
                    onChange={handleChange} 
                    placeholder="Enter your password"
                    required 
                  />
                </div>
              </>
            ) : (
              <>
                <div className="form-group">
                  <label>Username</label>
                  <input 
                    type="text" 
                    name="username" 
                    value={formData.username} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
                
                <div className="form-group">
                  <label>Password</label>
                  <input 
                    type="password" 
                    name="password" 
                    value={formData.password} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
              </>
            )}
            
            <button type="submit" className="btn" style={{ width: '100%' }}>
              Login
            </button>
          </form>

          {loginType === 'member' && (
            <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '14px', color: '#666' }}>
              <p>Don't have an account? <a href="/member-register" style={{ color: '#8B0000' }}>Register as Member</a></p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
