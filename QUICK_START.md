# Quick Start Guide - અખિલ ગુજરાત અગ્નિવીર સમિતિ

## ✅ Your servers are already running!

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000

## 🔧 Next Steps to Complete Setup

### Step 1: Setup MongoDB

You need MongoDB to store data. Choose one option:

#### Option A: MongoDB Atlas (Cloud - Recommended)
1. Go to https://www.mongodb.com/cloud/atlas/register
2. Create free account
3. Create a free cluster
4. Click "Connect" → "Connect your application"
5. Copy connection string
6. Update `.env` file:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/samiti_db
   ```

#### Option B: Install MongoDB Locally
1. Download: https://www.mongodb.com/try/download/community
2. Install and run MongoDB
3. `.env` is already configured for local MongoDB

### Step 2: Create State Admin Account

Once MongoDB is connected, run:
```bash
node scripts/createAdmin.js
```

This creates:
- Username: `admin`
- Password: `admin123`

### Step 3: Seed All 33 Gujarat Districts

```bash
node scripts/seedGujaratDistricts.js
```

This creates all 33 districts with their admin accounts.

### Step 4: Login and Approve Districts

1. Open http://localhost:3000
2. Click "Login"
3. Select "State Admin Login"
4. Login with:
   - Username: `admin`
   - Password: `admin123`
5. Go to Admin Dashboard
6. Approve districts by clicking "Approve" button

### Step 5: Test District Login

1. Logout from state admin
2. Login as district admin:
   - Select "District Login"
   - Username: `ahmedabad_admin` (or any district)
   - Password: `ahmedabad123`
3. You'll see district-specific dashboard

## 🎯 What You Can Do Now

### As State Admin:
✅ View all 33 districts
✅ Approve/revoke district access
✅ Assign presidents and vice presidents
✅ View all members and volunteers
✅ View all feedback
✅ Generate reports

### As District Admin:
✅ Approve member registrations
✅ Manage volunteers
✅ Create events
✅ Send notifications
✅ View district feedback
✅ Generate district reports

### As Public User:
✅ Register as member
✅ Register as volunteer
✅ Submit feedback
✅ View events
✅ View districts

## 📝 Important Notes

1. **District admins cannot login until approved by state admin**
2. **Each member/volunteer gets unique ID**: 24{DistrictCode}{Number}
3. **State admin has full access to everything**
4. **District admins can only see their district data**

## 🆘 Troubleshooting

### MongoDB Connection Error
- Make sure MongoDB is running
- Check connection string in `.env`
- For Atlas, whitelist your IP address

### Cannot Login as District Admin
- Make sure state admin has approved the district
- Check username/password
- District must be active

### Servers Not Running
```bash
# Backend
npm run dev

# Frontend (new terminal)
cd client
npm start
```

## 📚 More Information

- See `FEATURES.md` for complete feature list
- See `README.md` for detailed documentation
- See `SETUP_GUIDE.md` for MongoDB setup help

## 🎉 You're All Set!

Once MongoDB is connected and admin is created, you can start using the system!
