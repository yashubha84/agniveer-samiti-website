# Member Login System - Complete Guide

## Overview
The authentication system now supports three types of users:
1. **State Admin** - Full system access
2. **District Admin** - District-specific access
3. **Members** - Personal dashboard access

## Member Registration Requirements

### Required Fields (Compulsory):
- ✅ Full Name
- ✅ **Army Number** (Unique identifier for login)
- ✅ District (Select from 33 Gujarat districts)
- ✅ **Mobile Number** (10-digit, required for login)
- ✅ Email
- ✅ Address
- ✅ Password (Minimum 6 characters)
- ✅ Confirm Password

### Optional Fields:
- Occupation

## Login Methods

### 1. Member Login
**Credentials Required:**
- Army Number
- Mobile Number

**Process:**
1. Go to http://localhost:3001/login
2. Click "Member Login" tab
3. Enter your Army Number
4. Enter your Mobile Number (10 digits)
5. Click Login

**After Login:**
- Members are redirected to `/member-dashboard`
- Can view their profile information
- Can see upcoming events
- Status must be "approved" by district admin to login

### 2. District Admin Login
**Credentials Required:**
- Username (e.g., ahmedabad_admin)
- Password (e.g., ahmedabad123)

**Process:**
1. Click "District Admin" tab
2. Enter username and password
3. Must be approved by State Admin first

### 3. State Admin Login
**Credentials Required:**
- Username: `admin`
- Password: `admin123`

**Process:**
1. Click "State Admin" tab
2. Enter credentials
3. Full system access

## Member Registration Flow

### Step 1: Register
1. Go to http://localhost:3001/member-register
2. Fill in all required fields:
   - Full Name
   - **Army Number** (save this for login!)
   - Select District
   - **Mobile Number** (save this for login!)
   - Email
   - Address
   - Occupation (optional)
   - Create Password
   - Confirm Password
3. Click "Register"
4. You'll receive a Member ID (e.g., AGAS01-00001)

### Step 2: Wait for Approval
- Your registration goes to your district admin
- Status: "Pending"
- You cannot login until approved

### Step 3: District Admin Approves
- District admin reviews your application
- Changes status to "Approved"

### Step 4: Login
- Use your Army Number + Mobile Number to login
- Access your member dashboard

## Database Schema Updates

### Member Model (Updated)
```javascript
{
  memberId: String (auto-generated, unique),
  fullName: String (required),
  armyNumber: String (required, unique),
  district: ObjectId (required),
  phone: String (required),
  email: String (required),
  address: String (required),
  occupation: String,
  password: String (required, hashed with bcrypt),
  status: 'pending' | 'approved' | 'rejected',
  approvedBy: ObjectId,
  approvedAt: Date,
  createdAt: Date
}
```

## API Endpoints

### Member Registration
```
POST /api/members/register
Body: {
  fullName, armyNumber, district, phone, 
  email, address, occupation, password
}
Response: { msg, memberId }
```

### Member Login
```
POST /api/auth/member/login
Body: { armyNumber, phone }
Response: { token, user }
```

### Get Member Info
```
GET /api/members/:id
Headers: { 'x-auth-token': token }
Response: { member details }
```

## Security Features

1. **Password Hashing**: All passwords are hashed using bcrypt (10 rounds)
2. **JWT Tokens**: 7-day expiration for all user types
3. **Approval System**: Members must be approved before login
4. **Unique Identifiers**: Army numbers must be unique across the system
5. **Phone Validation**: 10-digit mobile number required

## Member Dashboard Features

### Profile Section
- Member ID
- Full Name
- Army Number
- District
- Phone Number
- Email
- Approval Status

### Events Section
- View all upcoming events
- See event details (date, location, district)
- State-level and district-level events

## Testing the System

### Test Member Registration:
1. Open http://localhost:3001/member-register
2. Fill form with test data:
   - Name: Test Member
   - Army Number: ARM123456
   - District: Ahmedabad
   - Phone: 9876543210
   - Email: test@example.com
   - Address: Test Address
   - Password: test123
3. Submit and note the Member ID

### Test District Admin Approval:
1. Login as district admin (ahmedabad_admin / ahmedabad123)
2. Go to district dashboard
3. See pending member in "Pending Member Approvals"
4. Click "Approve"

### Test Member Login:
1. Logout
2. Go to login page
3. Click "Member Login"
4. Enter Army Number: ARM123456
5. Enter Phone: 9876543210
6. Login successful → redirected to member dashboard

## Important Notes

1. **Army Number is Unique**: Each member must have a unique army service number
2. **Mobile Number Required**: Used as second factor for login authentication
3. **No Password Login for Members**: Members login with Army Number + Phone only
4. **Approval Required**: Members cannot login until district admin approves
5. **Member ID Auto-Generated**: Format: AGAS{districtCode}{number}
   - Example: AGAS01-00001 (First member of Ahmedabad)

## Troubleshooting

### "Invalid army number or mobile number"
- Check if army number is correct
- Verify mobile number is exactly 10 digits
- Ensure you registered with these credentials

### "Your membership is pending approval"
- Contact your district admin
- Wait for approval before attempting login

### "Registration failed"
- Army number might already be registered
- Check all required fields are filled
- Ensure passwords match
- Mobile number must be 10 digits

## Server Status

✅ Backend: http://localhost:5000
✅ Frontend: http://localhost:3001
✅ MongoDB: Connected to Atlas (samiti_db)

## Next Steps

1. Test member registration with real data
2. District admins approve members
3. Members can login and access their dashboard
4. Future: Add member profile editing, event registration, etc.
