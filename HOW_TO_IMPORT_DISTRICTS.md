<!--  --># How to Import District Names

## Method 1: Import from DistrictsList Component (Recommended)

### Step 1: Import the constant
```javascript
import { GUJARAT_DISTRICTS } from '../components/DistrictsList';
```

### Step 2: Use it in your component
```javascript
const MyComponent = () => {
  // GUJARAT_DISTRICTS is an array of objects
  // Each object has: { code: '01', name: 'Ahmedabad' }
  
  return (
    <select>
      {GUJARAT_DISTRICTS.map(district => (
        <option key={district.code} value={district.code}>
          {district.name}
        </option>
      ))}
    </select>
  );
};
```

### Complete Example:
```javascript
import React from 'react';
import { GUJARAT_DISTRICTS } from '../components/DistrictsList';

const DistrictSelector = () => {
  const [selectedDistrict, setSelectedDistrict] = React.useState('');

  return (
    <div>
      <label>Select District:</label>
      <select 
        value={selectedDistrict} 
        onChange={(e) => setSelectedDistrict(e.target.value)}
      >
        <option value="">-- Select District --</option>
        {GUJARAT_DISTRICTS.map(district => (
          <option key={district.code} value={district.code}>
            {district.name} District
          </option>
        ))}
      </select>
      
      {selectedDistrict && (
        <p>You selected: {GUJARAT_DISTRICTS.find(d => d.code === selectedDistrict)?.name}</p>
      )}
    </div>
  );
};

export default DistrictSelector;
```

---

## Method 2: Import the Component

### Step 1: Import the component
```javascript
import DistrictsList from '../components/DistrictsList';
```

### Step 2: Use it to display all districts
```javascript
const MyPage = () => {
  return (
    <div>
      <h1>All Districts</h1>
      <DistrictsList showCodes={true} />
    </div>
  );
};
```

---

## Method 3: Fetch from API (Current Implementation)

### This is already implemented in your registration pages:

```javascript
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyComponent = () => {
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
    <select>
      {districts.map(d => (
        <option key={d._id} value={d._id}>
          {d.name}
        </option>
      ))}
    </select>
  );
};
```

---

## Method 4: Hybrid Approach (Best for Production)

### Fetch from API with fallback to static list:

```javascript
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GUJARAT_DISTRICTS } from '../components/DistrictsList';

const MyComponent = () => {
  const [districts, setDistricts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDistricts();
  }, []);

  const fetchDistricts = async () => {
    try {
      const res = await axios.get('/api/districts');
      setDistricts(res.data);
    } catch (err) {
      console.error('Failed to fetch from API, using static list');
      // Fallback to static list
      setDistricts(GUJARAT_DISTRICTS.map(d => ({ 
        _id: d.code, 
        name: d.name 
      })));
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading districts...</div>;
  }

  return (
    <select>
      <option value="">Select District</option>
      {districts.map(d => (
        <option key={d._id} value={d._id}>
          {d.name}
        </option>
      ))}
    </select>
  );
};
```

---

## Method 5: Direct Array (Quick & Simple)

### For quick prototyping or when you don't need the component:

```javascript
const DISTRICTS = [
  'Ahmedabad', 'Amreli', 'Anand', 'Aravalli', 'Banaskantha',
  'Bharuch', 'Bhavnagar', 'Botad', 'Chhota Udaipur', 'Dahod',
  'Dang', 'Devbhoomi Dwarka', 'Gandhinagar', 'Gir Somnath',
  'Jamnagar', 'Junagadh', 'Kheda', 'Kutch', 'Mahisagar',
  'Mehsana', 'Morbi', 'Narmada', 'Navsari', 'Panchmahal',
  'Patan', 'Porbandar', 'Rajkot', 'Sabarkantha', 'Surat',
  'Surendranagar', 'Tapi', 'Vadodara', 'Valsad'
];

const MyComponent = () => {
  return (
    <select>
      {DISTRICTS.map((district, index) => (
        <option key={index} value={district}>
          {district}
        </option>
      ))}
    </select>
  );
};
```

---

## Usage Examples

### Example 1: Registration Form
```javascript
import React, { useState } from 'react';
import { GUJARAT_DISTRICTS } from '../components/DistrictsList';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    district: '',
    phone: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const districtName = GUJARAT_DISTRICTS.find(
      d => d.code === formData.district
    )?.name;
    
    console.log('Registering:', formData.name, 'from', districtName);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({...formData, name: e.target.value})}
      />
      
      <select
        value={formData.district}
        onChange={(e) => setFormData({...formData, district: e.target.value})}
      >
        <option value="">Select District</option>
        {GUJARAT_DISTRICTS.map(d => (
          <option key={d.code} value={d.code}>{d.name}</option>
        ))}
      </select>
      
      <button type="submit">Register</button>
    </form>
  );
};
```

### Example 2: Filter by District
```javascript
import React, { useState } from 'react';
import { GUJARAT_DISTRICTS } from '../components/DistrictsList';

const MembersList = ({ members }) => {
  const [filterDistrict, setFilterDistrict] = useState('');

  const filteredMembers = filterDistrict
    ? members.filter(m => m.district === filterDistrict)
    : members;

  return (
    <div>
      <select 
        value={filterDistrict} 
        onChange={(e) => setFilterDistrict(e.target.value)}
      >
        <option value="">All Districts</option>
        {GUJARAT_DISTRICTS.map(d => (
          <option key={d.code} value={d.code}>{d.name}</option>
        ))}
      </select>

      <ul>
        {filteredMembers.map(member => (
          <li key={member.id}>{member.name}</li>
        ))}
      </ul>
    </div>
  );
};
```

### Example 3: Display District Info
```javascript
import React from 'react';
import { GUJARAT_DISTRICTS } from '../components/DistrictsList';

const DistrictInfo = ({ districtCode }) => {
  const district = GUJARAT_DISTRICTS.find(d => d.code === districtCode);

  if (!district) {
    return <div>District not found</div>;
  }

  return (
    <div>
      <h2>{district.name} District</h2>
      <p>District Code: {district.code}</p>
      <p>Member ID Format: 24{district.code}XXXXX</p>
      <p>Volunteer ID Format: 24{district.code}VXXXX</p>
    </div>
  );
};
```

---

## What's Available in GUJARAT_DISTRICTS

The `GUJARAT_DISTRICTS` constant is an array of 33 objects:

```javascript
[
  { code: '01', name: 'Ahmedabad' },
  { code: '02', name: 'Amreli' },
  { code: '03', name: 'Anand' },
  // ... 30 more districts
  { code: '33', name: 'Valsad' }
]
```

### Properties:
- `code`: District code (01-33)
- `name`: District name

### Useful Operations:

```javascript
// Get all district names
const names = GUJARAT_DISTRICTS.map(d => d.name);

// Get all district codes
const codes = GUJARAT_DISTRICTS.map(d => d.code);

// Find district by code
const district = GUJARAT_DISTRICTS.find(d => d.code === '01');

// Find district by name
const district = GUJARAT_DISTRICTS.find(d => d.name === 'Ahmedabad');

// Check if district exists
const exists = GUJARAT_DISTRICTS.some(d => d.name === 'Ahmedabad');

// Get total count
const count = GUJARAT_DISTRICTS.length; // 33

// Sort alphabetically
const sorted = [...GUJARAT_DISTRICTS].sort((a, b) => 
  a.name.localeCompare(b.name)
);
```

---

## File Locations

- **Component**: `client/src/components/DistrictsList.js`
- **Usage Examples**: 
  - `client/src/pages/MemberRegister.js`
  - `client/src/pages/VolunteerRegister.js`
  - `client/src/pages/DistrictFeedback.js`

---

## Quick Reference

| Method | When to Use | Pros | Cons |
|--------|-------------|------|------|
| Import GUJARAT_DISTRICTS | Need static list | Fast, no API call | Not dynamic |
| Import Component | Display all districts | Reusable, styled | Limited customization |
| Fetch from API | Need database data | Dynamic, real-time | Requires API |
| Hybrid | Production apps | Best of both | More code |
| Direct Array | Quick prototype | Simple | No structure |

---

## Best Practice

For production, use the **Hybrid Approach**:

```javascript
import { GUJARAT_DISTRICTS } from '../components/DistrictsList';

// Try API first, fallback to static list
const fetchDistricts = async () => {
  try {
    const res = await axios.get('/api/districts');
    setDistricts(res.data);
  } catch (err) {
    setDistricts(GUJARAT_DISTRICTS.map(d => ({ 
      _id: d.code, 
      name: d.name 
    })));
  }
};
```

This ensures your app works even if:
- MongoDB is not connected
- API is down
- Network issues occur
