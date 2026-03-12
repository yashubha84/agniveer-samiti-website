import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Districts from './pages/Districts';
import Events from './pages/Events';
import MemberRegister from './pages/MemberRegister';
import VolunteerRegister from './pages/VolunteerRegister';
import DistrictFeedback from './pages/DistrictFeedback';
import Contact from './pages/Contact';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import DistrictDashboard from './pages/DistrictDashboard';
import MemberDashboard from './pages/MemberDashboard';
import Reports from './pages/Reports';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <Router>
      <div className="App">
        <Navbar user={user} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/districts" element={<Districts />} />
          <Route path="/events" element={<Events />} />
          <Route path="/member-register" element={<MemberRegister />} />
          <Route path="/volunteer-register" element={<VolunteerRegister />} />
          <Route path="/feedback" element={<DistrictFeedback />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route 
            path="/admin-dashboard" 
            element={user?.role === 'state_admin' ? <AdminDashboard /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/district-dashboard" 
            element={user?.role === 'district_admin' ? <DistrictDashboard user={user} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/member-dashboard" 
            element={user?.role === 'member' ? <MemberDashboard user={user} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/reports" 
            element={user?.role === 'state_admin' || user?.role === 'district_admin' ? <Reports user={user} /> : <Navigate to="/login" />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
