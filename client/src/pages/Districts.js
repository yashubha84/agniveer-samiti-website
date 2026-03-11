import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Districts = () => {
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    fetchDistricts();
  }, []);

  const fetchDistricts = async () => {
    try {
      const res = await axios.get('/api/districts');
      setDistricts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="section">
      <div className="container">
        <h1 className="section-title">Our Districts</h1>
        <div className="grid">
          {districts.map(district => (
            <div key={district._id} className="district-card">
              <div className="district-card-content">
                <h3>{district.name}</h3>
                
                {district.president?.name && (
                  <div>
                    <h4>President</h4>
                    <p>{district.president.name}</p>
                    {district.president.phone && <p>📞 {district.president.phone}</p>}
                  </div>
                )}
                
                {district.secretary?.name && (
                  <div>
                    <h4>Secretary</h4>
                    <p>{district.secretary.name}</p>
                    {district.secretary.phone && <p>📞 {district.secretary.phone}</p>}
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

export default Districts;
