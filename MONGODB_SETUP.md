# MongoDB Setup Guide for અખિલ ગુજરાત અગ્નિવીર સમિતિ

## Option 1: MongoDB Atlas (Cloud - Recommended) ⭐

### Step 1: Create MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Sign up with your email or Google account
3. Complete the registration

### Step 2: Create a Free Cluster

1. After login, click "Build a Database"
2. Choose **FREE** tier (M0 Sandbox)
3. Select a cloud provider (AWS recommended)
4. Choose a region closest to you (e.g., Mumbai for India)
5. Cluster Name: `agniveer-samiti` (or any name)
6. Click "Create"

### Step 3: Create Database User

1. Click "Database Access" in left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Username: `samiti_admin`
5. Password: Click "Autogenerate Secure Password" (SAVE THIS!)
6. Database User Privileges: Select "Read and write to any database"
7. Click "Add User"

### Step 4: Whitelist Your IP Address

1. Click "Network Access" in left sidebar
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (for development)
   - This adds `0.0.0.0/0` to whitelist
4. Click "Confirm"

### Step 5: Get Connection String

1. Go back to "Database" (left sidebar)
2. Click "Connect" button on your cluster
3. Choose "Connect your application"
4. Driver: Node.js
5. Version: 4.1 or later
6. Copy the connection string

It will look like:
```
mongodb+srv://samiti_admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

### Step 6: Update .env File

1. Open your `.env` file in the project root
2. Replace `<password>` with your actual password
3. Add database name after `.net/`

Example:
```env
PORT=5000
MONGODB_URI=mongodb+srv://samiti_admin:YourPassword123@cluster0.xxxxx.mongodb.net/samiti_db?retryWrites=true&w=majority
JWT_SECRET=agniveer_samiti_secret_key_2024_secure
NODE_ENV=development
```

---

## Option 2: Local MongoDB Installation

### For Windows:

1. **Download MongoDB**
   - Go to: https://www.mongodb.com/try/download/community
   - Select: Windows
   - Version: Latest
   - Package: MSI
   - Click Download

2. **Install MongoDB**
   - Run the downloaded `.msi` file
   - Choose "Complete" installation
   - Install as a Service: ✓ (checked)
   - Service Name: MongoDB
   - Data Directory: `C:\Program Files\MongoDB\Server\7.0\data`
   - Log Directory: `C:\Program Files\MongoDB\Server\7.0\log`

3. **Verify Installation**
   ```bash
   mongod --version
   ```

4. **Your .env file** (already configured):
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/samiti_db
   JWT_SECRET=agniveer_samiti_secret_key_2024_secure
   NODE_ENV=development
   ```

### For Mac:

```bash
# Install using Homebrew
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community

# Verify
mongod --version
```

### For Linux (Ubuntu/Debian):

```bash
# Import MongoDB public key
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -

# Create list file
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# Update packages
sudo apt-get update

# Install MongoDB
sudo apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod

# Enable on boot
sudo systemctl enable mongod

# Verify
mongod --version
```

---

## Database Structure

Your MongoDB database will have these collections:

### 1. admins
- State admin accounts
- Fields: username, password, role, name, email

### 2. districts
- All 33 Gujarat districts
- Fields: name, districtCode, username, password, president, vicePresident, secretary, treasurer, committeeMembers, isApprovedByState

### 3. members
- Registered members
- Fields: memberId (24{districtCode}{number}), fullName, district, phone, email, address, occupation, photo, status, approvedBy

### 4. volunteers
- Registered volunteers
- Fields: volunteerId (24{districtCode}V{number}), name, district, phone, email, skills, availability, status

### 5. events
- District and state events
- Fields: title, description, district, eventType, date, location, photos, volunteers

### 6. notifications
- Announcements and notifications
- Fields: title, message, type, district, priority, isActive

### 7. feedback
- District feedback from users
- Fields: district, userName, userEmail, rating, message, status, response

---

## Initialize Database

After MongoDB is connected, run these commands:

### 1. Create State Admin
```bash
node scripts/createAdmin.js
```

This creates:
- Username: `admin`
- Password: `admin123`

### 2. Seed All 33 Gujarat Districts
```bash
node scripts/seedGujaratDistricts.js
```

This creates all districts with:
- District codes: 01-33
- Usernames: `{district_name}_admin`
- Passwords: `{district_name}123`

---

## Test Connection

### Method 1: Start Backend Server
```bash
npm run dev
```

If you see:
```
MongoDB Connected
Server running on port 5000
```
✅ Connection successful!

### Method 2: Test Script

Create `test-connection.js`:
```javascript
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB Connected Successfully!');
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ MongoDB Connection Failed:', err.message);
    process.exit(1);
  });
```

Run:
```bash
node test-connection.js
```

---

## Troubleshooting

### Error: "MongoNetworkError"
- Check your internet connection
- Verify IP whitelist in Atlas
- Check connection string format

### Error: "Authentication failed"
- Verify username and password
- Check if user has correct permissions
- Ensure password doesn't have special characters (or encode them)

### Error: "ECONNREFUSED"
- MongoDB service not running (local)
- Check if MongoDB is installed
- Restart MongoDB service

### Error: "Timeout"
- Check firewall settings
- Verify network access in Atlas
- Try different network/VPN

---

## Environment Variables Explained

```env
# Server Port
PORT=5000

# MongoDB Connection String
# Format: mongodb://[username:password@]host[:port]/database[?options]
MONGODB_URI=mongodb://localhost:27017/samiti_db

# JWT Secret for Authentication
# Use a long, random string in production
JWT_SECRET=agniveer_samiti_secret_key_2024_secure

# Environment
# development | production
NODE_ENV=development
```

---

## Production Recommendations

1. **Use MongoDB Atlas** for production
2. **Change default passwords** immediately
3. **Use strong JWT_SECRET** (generate random string)
4. **Enable IP whitelist** (don't use 0.0.0.0/0)
5. **Enable MongoDB authentication**
6. **Regular backups** (Atlas does this automatically)
7. **Monitor database** usage and performance

---

## Quick Start Commands

```bash
# 1. Setup MongoDB (choose Atlas or Local)

# 2. Update .env with connection string

# 3. Create admin
node scripts/createAdmin.js

# 4. Seed districts
node scripts/seedGujaratDistricts.js

# 5. Start backend
npm run dev

# 6. Start frontend (new terminal)
cd client
npm start

# 7. Open browser
# http://localhost:3000
```

---

## Need Help?

- MongoDB Atlas Docs: https://docs.atlas.mongodb.com/
- MongoDB Installation: https://docs.mongodb.com/manual/installation/
- Connection String Format: https://docs.mongodb.com/manual/reference/connection-string/
