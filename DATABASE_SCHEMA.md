# Database Schema - અખિલ ગુજરાત અગ્નિવીર સમિતિ

## Database Name: `samiti_db`

---

## Collections

### 1. admins
State admin accounts with full system access.

```javascript
{
  _id: ObjectId,
  username: String (required, unique),
  password: String (required, hashed),
  role: String (default: 'state_admin'),
  name: String,
  email: String,
  createdAt: Date (default: Date.now)
}
```

**Example:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "username": "admin",
  "password": "$2a$10$...", 
  "role": "state_admin",
  "name": "State Administrator",
  "email": "admin@samiti.org",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

---

### 2. districts
All 33 Gujarat districts with their admin credentials and committee details.

```javascript
{
  _id: ObjectId,
  name: String (required, unique),
  districtCode: String (required, unique), // 01-33
  username: String (required, unique),
  password: String (required, hashed),
  role: String (default: 'district_admin'),
  isApprovedByState: Boolean (default: false),
  president: {
    name: String,
    phone: String,
    email: String,
    photo: String
  },
  vicePresident: {
    name: String,
    phone: String,
    email: String,
    photo: String
  },
  secretary: {
    name: String,
    phone: String,
    email: String,
    photo: String
  },
  treasurer: {
    name: String,
    phone: String,
    email: String,
    photo: String
  },
  committeeMembers: [{
    name: String,
    position: String,
    phone: String,
    email: String,
    photo: String
  }],
  isActive: Boolean (default: true),
  createdAt: Date (default: Date.now)
}
```

**Example:**
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "name": "Ahmedabad",
  "districtCode": "01",
  "username": "ahmedabad_admin",
  "password": "$2a$10$...",
  "role": "district_admin",
  "isApprovedByState": true,
  "president": {
    "name": "Rajesh Kumar",
    "phone": "9876543210",
    "email": "rajesh@example.com"
  },
  "isActive": true,
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

---

### 3. members
Registered members with unique IDs based on state and district codes.

```javascript
{
  _id: ObjectId,
  memberId: String (unique, auto-generated), // Format: 24{districtCode}{number}
  fullName: String (required),
  district: ObjectId (ref: 'District', required),
  phone: String (required),
  email: String (required),
  address: String (required),
  occupation: String,
  photo: String,
  status: String (enum: ['pending', 'approved', 'rejected'], default: 'pending'),
  approvedBy: ObjectId (ref: 'District'),
  approvedAt: Date,
  createdAt: Date (default: Date.now)
}
```

**Member ID Format:**
- `24` = Gujarat state code
- `01` = District code (Ahmedabad)
- `00001` = Member number
- Example: `2401000001`

**Example:**
```json
{
  "_id": "507f1f77bcf86cd799439013",
  "memberId": "2401000001",
  "fullName": "Amit Patel",
  "district": "507f1f77bcf86cd799439012",
  "phone": "9876543210",
  "email": "amit@example.com",
  "address": "123 Main St, Ahmedabad",
  "occupation": "Engineer",
  "status": "approved",
  "approvedBy": "507f1f77bcf86cd799439012",
  "approvedAt": "2024-01-02T00:00:00.000Z",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

---

### 4. volunteers
Registered volunteers with unique IDs.

```javascript
{
  _id: ObjectId,
  volunteerId: String (unique, auto-generated), // Format: 24{districtCode}V{number}
  name: String (required),
  district: ObjectId (ref: 'District', required),
  phone: String (required),
  email: String,
  skills: [String],
  availability: String (enum: ['weekdays', 'weekends', 'both'], default: 'both'),
  status: String (enum: ['active', 'inactive'], default: 'active'),
  eventsParticipated: [ObjectId] (ref: 'Event'),
  createdAt: Date (default: Date.now)
}
```

**Volunteer ID Format:**
- `24` = Gujarat state code
- `01` = District code
- `V` = Volunteer identifier
- `0001` = Volunteer number
- Example: `2401V0001`

**Example:**
```json
{
  "_id": "507f1f77bcf86cd799439014",
  "volunteerId": "2401V0001",
  "name": "Priya Shah",
  "district": "507f1f77bcf86cd799439012",
  "phone": "9876543211",
  "email": "priya@example.com",
  "skills": ["First Aid", "Event Management"],
  "availability": "weekends",
  "status": "active",
  "eventsParticipated": [],
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

---

### 5. events
District and state-level events.

```javascript
{
  _id: ObjectId,
  title: String (required),
  description: String (required),
  district: ObjectId (ref: 'District'),
  eventType: String (enum: ['state', 'district'], default: 'district'),
  date: Date (required),
  location: String,
  photos: [String],
  volunteers: [ObjectId] (ref: 'Volunteer'),
  createdBy: ObjectId (ref: 'District'),
  createdAt: Date (default: Date.now)
}
```

**Example:**
```json
{
  "_id": "507f1f77bcf86cd799439015",
  "title": "Blood Donation Camp",
  "description": "Annual blood donation drive",
  "district": "507f1f77bcf86cd799439012",
  "eventType": "district",
  "date": "2024-02-15T10:00:00.000Z",
  "location": "City Hospital, Ahmedabad",
  "photos": [],
  "volunteers": ["507f1f77bcf86cd799439014"],
  "createdBy": "507f1f77bcf86cd799439012",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

---

### 6. notifications
System-wide and district-specific notifications.

```javascript
{
  _id: ObjectId,
  title: String (required),
  message: String (required),
  type: String (enum: ['state', 'district', 'event'], required),
  district: ObjectId (ref: 'District'),
  priority: String (enum: ['low', 'medium', 'high'], default: 'medium'),
  isActive: Boolean (default: true),
  createdBy: ObjectId (ref: 'District'),
  createdAt: Date (default: Date.now)
}
```

**Example:**
```json
{
  "_id": "507f1f77bcf86cd799439016",
  "title": "Upcoming Meeting",
  "message": "District committee meeting on 20th Jan",
  "type": "district",
  "district": "507f1f77bcf86cd799439012",
  "priority": "high",
  "isActive": true,
  "createdBy": "507f1f77bcf86cd799439012",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

---

### 7. feedback
User feedback for districts with ratings.

```javascript
{
  _id: ObjectId,
  district: ObjectId (ref: 'District', required),
  userName: String (required),
  userEmail: String (required),
  userPhone: String,
  rating: Number (min: 1, max: 5, required),
  message: String (required),
  status: String (enum: ['pending', 'reviewed', 'resolved'], default: 'pending'),
  response: String,
  respondedBy: ObjectId (ref: 'District'),
  respondedAt: Date,
  createdAt: Date (default: Date.now)
}
```

**Example:**
```json
{
  "_id": "507f1f77bcf86cd799439017",
  "district": "507f1f77bcf86cd799439012",
  "userName": "Suresh Mehta",
  "userEmail": "suresh@example.com",
  "userPhone": "9876543212",
  "rating": 5,
  "message": "Excellent work by the district committee!",
  "status": "reviewed",
  "response": "Thank you for your feedback!",
  "respondedBy": "507f1f77bcf86cd799439012",
  "respondedAt": "2024-01-02T00:00:00.000Z",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

---

## Indexes

For better performance, create these indexes:

```javascript
// admins
db.admins.createIndex({ username: 1 }, { unique: true })

// districts
db.districts.createIndex({ name: 1 }, { unique: true })
db.districts.createIndex({ districtCode: 1 }, { unique: true })
db.districts.createIndex({ username: 1 }, { unique: true })

// members
db.members.createIndex({ memberId: 1 }, { unique: true })
db.members.createIndex({ district: 1 })
db.members.createIndex({ status: 1 })

// volunteers
db.volunteers.createIndex({ volunteerId: 1 }, { unique: true })
db.volunteers.createIndex({ district: 1 })

// events
db.events.createIndex({ district: 1 })
db.events.createIndex({ date: -1 })

// notifications
db.notifications.createIndex({ district: 1 })
db.notifications.createIndex({ isActive: 1 })

// feedback
db.feedback.createIndex({ district: 1 })
db.feedback.createIndex({ status: 1 })
```

---

## Relationships

```
admins (1) -------- (manages) -------- (many) districts
districts (1) ------ (has) ----------- (many) members
districts (1) ------ (has) ----------- (many) volunteers
districts (1) ------ (creates) ------- (many) events
districts (1) ------ (creates) ------- (many) notifications
districts (1) ------ (receives) ------ (many) feedback
events (many) ------ (has) ----------- (many) volunteers
```

---

## Data Size Estimates

For 33 districts with moderate usage:

- admins: ~10 documents (~10 KB)
- districts: 33 documents (~50 KB)
- members: ~10,000 documents (~10 MB)
- volunteers: ~5,000 documents (~5 MB)
- events: ~500 documents (~500 KB)
- notifications: ~1,000 documents (~500 KB)
- feedback: ~2,000 documents (~2 MB)

**Total: ~18 MB** (well within free tier limits)

---

## Backup Strategy

### MongoDB Atlas (Automatic)
- Continuous backups
- Point-in-time recovery
- Automated snapshots

### Local MongoDB
```bash
# Backup
mongodump --db samiti_db --out ./backup

# Restore
mongorestore --db samiti_db ./backup/samiti_db
```
