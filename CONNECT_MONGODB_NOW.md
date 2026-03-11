# Connect to MongoDB - Quick Guide

## Option 1: MongoDB Atlas (Cloud - Recommended) ⭐

### Step 1: Create Account (2 minutes)
1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Sign up with Google or Email
3. Complete registration

### Step 2: Create Free Cluster (3 minutes)
1. After login, click **"Build a Database"**
2. Choose **"M0 FREE"** tier
3. Cloud Provider: **AWS** (recommended)
4. Region: Choose closest to you (e.g., Mumbai for India)
5. Cluster Name: `agniveer-cluster` (or any name)
6. Click **"Create"** (wait 3-5 minutes)

### Step 3: Create Database User (1 minute)
1. Click **"Database Access"** (left sidebar)
2. Click **"Add New Database User"**
3. Authentication Method: **Password**
4. Username: `samiti_admin`
5. Password: Click **"Autogenerate Secure Password"**
   - **IMPORTANT: Copy and save this password!**
6. Database User Privileges: **"Read and write to any database"**
7. Click **"Add User"**

### Step 4: Whitelist IP Address (1 minute)
1. Click **"Network Access"** (left sidebar)
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"**
   - This adds `0.0.0.0/0`
4. Click **"Confirm"**

### Step 5: Get Connection String (1 minute)
1. Go back to **"Database"** (left sidebar)
2. Click **"Connect"** button on your cluster
3. Choose **"Connect your application"**
4. Driver: **Node.js**
5. Version: **4.1 or later**
6. **Copy the connection string**

It looks like:
```
mongodb+srv://samiti_admin:<password>@agniveer-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

### Step 6: Update .env File
1. Open `.env` file in your project root
2. Replace the MONGODB_URI line with your connection string
3. Replace `<password>` with your actual password
4. Add `/samiti_db` before the `?`

**Example:**
```env
PORT=5000
MONGODB_URI=mongodb+srv://samiti_admin:YourPassword123@agniveer-cluster.abc123.mongodb.net/samiti_db?retryWrites=true&w=majority
JWT_SECRET=agniveer_samiti_secret_key_2024_secure
NODE_ENV=development
```

### Step 7: Test Connection
```bash
node test-connection.js
```

If you see "✅ MongoDB Connected Successfully!" - you're done!

---

## Option 2: Local MongoDB (For Windows)

### Step 1: Download MongoDB
1. Go to: https://www.mongodb.com/try/download/community
2. Version: Latest
3. Platform: Windows
4. Package: MSI
5. Click **Download**

### Step 2: Install MongoDB
1. Run the downloaded `.msi` file
2. Choose **"Complete"** installation
3. **Important Settings:**
   - ✅ Install MongoDB as a Service
   - Service Name: `MongoDB`
   - Data Directory: `C:\Program Files\MongoDB\Server\7.0\data`
   - Log Directory: `C:\Program Files\MongoDB\Server\7.0\log`
4. Click **Next** → **Install**
5. Wait for installation to complete

### Step 3: Verify Installation
Open PowerShell and run:
```bash
mongod --version
```

You should see version information.

### Step 4: Your .env is Already Configured!
The `.env` file already has the correct local connection:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/samiti_db
JWT_SECRET=agniveer_samiti_secret_key_2024_secure
NODE_ENV=development
```

### Step 5: Test Connection
```bash
node test-connection.js
```

---

## After MongoDB is Connected

### 1. Create State Admin
```bash
node scripts/createAdmin.js
```

**Output:**
```
✅ State Admin created successfully!
Username: admin
Password: admin123
```

### 2. Seed All 33 Districts
```bash
node scripts/seedGujaratDistricts.js
```

**Output:**
```
✓ Created: Ahmedabad (Code: 01, Username: ahmedabad_admin, Password: ahmedabad123)
✓ Created: Amreli (Code: 02, Username: amreli_admin, Password: amreli123)
...
✅ All Gujarat districts seeded successfully!
```

### 3. Start Backend Server
```bash
npm run dev
```

**Output:**
```
MongoDB Connected
Server running on port 5000
```

### 4. Start Frontend (New Terminal)
```bash
cd client
npm start
```

**Output:**
```
Compiled successfully!
Local: http://localhost:3000
```

---

## Verify Everything Works

### Test 1: Check Districts API
Open browser: http://localhost:5000/api/districts

You should see JSON with all 33 districts.

### Test 2: Login as State Admin
1. Go to: http://localhost:3000/login
2. Select "State Admin Login"
3. Username: `admin`
4. Password: `admin123`
5. Click Login

You should see the Admin Dashboard!

### Test 3: Check Registration Pages
1. Go to: http://localhost:3000/member-register
2. Click District dropdown
3. You should see all 33 districts from database

---

## Troubleshooting

### Error: "MongoNetworkError"
**Solution:**
- Check internet connection
- For Atlas: Verify IP whitelist (0.0.0.0/0)
- For Local: Check if MongoDB service is running

### Error: "Authentication failed"
**Solution:**
- Check username and password in .env
- Make sure password doesn't have special characters
- For Atlas: Verify user has correct permissions

### Error: "ECONNREFUSED"
**Solution (Local MongoDB):**
- MongoDB service not running
- Open Services (Windows + R → services.msc)
- Find "MongoDB" service
- Right-click → Start

### Error: "Connection timeout"
**Solution:**
- Check firewall settings
- For Atlas: Verify network access settings
- Try different network/disable VPN

---

## Quick Commands Reference

```bash
# Test MongoDB connection
node test-connection.js

# Create admin account
node scripts/createAdmin.js

# Seed all districts
node scripts/seedGujaratDistricts.js

# Start backend
npm run dev

# Start frontend (new terminal)
cd client
npm start

# Check if MongoDB is running (Windows)
Get-Service MongoDB
```

---

## What Happens After Connection?

✅ **Backend connects to MongoDB**
✅ **All 33 districts load from database**
✅ **Admin can login**
✅ **District admins can login (after approval)**
✅ **Members can register**
✅ **Volunteers can register**
✅ **Events, notifications, feedback all work**

---

## Need Help?

See detailed guides:
- `MONGODB_SETUP.md` - Complete MongoDB setup
- `DATABASE_SCHEMA.md` - Database structure
- `ENV_VARIABLES_GUIDE.md` - Environment variables
- `QUICK_START.md` - Quick start guide

---

## Summary

**For Cloud (Easiest):**
1. Create MongoDB Atlas account
2. Create free cluster
3. Get connection string
4. Update .env file
5. Run: `node test-connection.js`

**For Local:**
1. Download and install MongoDB
2. .env already configured
3. Run: `node test-connection.js`

**Then:**
1. `node scripts/createAdmin.js`
2. `node scripts/seedGujaratDistricts.js`
3. `npm run dev`
4. Open http://localhost:3000

**That's it! 🎉**
