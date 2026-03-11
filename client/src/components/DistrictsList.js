import React from 'react';

// All 33 districts of Gujarat with their codes
const GUJARAT_DISTRICTS = [
  { code: '01', name: 'Ahmedabad' },
  { code: '02', name: 'Amreli' },
  { code: '03', name: 'Anand' },
  { code: '04', name: 'Aravalli' },
  { code: '05', name: 'Banaskantha' },
  { code: '06', name: 'Bharuch' },
  { code: '07', name: 'Bhavnagar' },
  { code: '08', name: 'Botad' },
  { code: '09', name: 'Chhota Udaipur' },
  { code: '10', name: 'Dahod' },
  { code: '11', name: 'Dang' },
  { code: '12', name: 'Devbhoomi Dwarka' },
  { code: '13', name: 'Gandhinagar' },
  { code: '14', name: 'Gir Somnath' },
  { code: '15', name: 'Jamnagar' },
  { code: '16', name: 'Junagadh' },
  { code: '17', name: 'Kheda' },
  { code: '18', name: 'Kutch' },
  { code: '19', name: 'Mahisagar' },
  { code: '20', name: 'Mehsana' },
  { code: '21', name: 'Morbi' },
  { code: '22', name: 'Narmada' },
  { code: '23', name: 'Navsari' },
  { code: '24', name: 'Panchmahal' },
  { code: '25', name: 'Patan' },
  { code: '26', name: 'Porbandar' },
  { code: '27', name: 'Rajkot' },
  { code: '28', name: 'Sabarkantha' },
  { code: '29', name: 'Surat' },
  { code: '30', name: 'Surendranagar' },
  { code: '31', name: 'Tapi' },
  { code: '32', name: 'Vadodara' },
  { code: '33', name: 'Valsad' }
];

const DistrictsList = ({ showCodes = false }) => {
  return (
    <div style={{ 
      background: '#f8f9fa', 
      padding: '15px', 
      borderRadius: '8px',
      marginTop: '15px'
    }}>
      <h4 style={{ marginBottom: '10px', color: '#667eea' }}>
        All 33 Districts of Gujarat
      </h4>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '10px',
        fontSize: '14px'
      }}>
        {GUJARAT_DISTRICTS.map(district => (
          <div key={district.code} style={{ 
            padding: '8px',
            background: 'white',
            borderRadius: '4px',
            border: '1px solid #e0e0e0'
          }}>
            {showCodes && <strong>{district.code}. </strong>}
            {district.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DistrictsList;
export { GUJARAT_DISTRICTS };
