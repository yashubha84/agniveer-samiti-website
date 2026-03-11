# Setup Guide for અખિલ ગુજરાત અગ્નિવીર સમિતિ Website

## Option 1: Using MongoDB Atlas (Cloud - Recommended for Quick Start)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Create a free account
3. Create a new cluster (free tier)
4. Click "Connect" → "Connect your application"
5. Copy the connection string
6. Update `.env` file with your connection string:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/samiti_db?retryWrites=true&w=majority
   ```

## Option 2: Install MongoDB Locally

### For Windows:
1. Download MongoDB from: https://www.mongodb.com/try/download/community
2. Install MongoDB Community Server
3. MongoDB will run automatically as a service
4. Keep the `.env` file as is:
   ```
   MONGODB_URI=mongodb://localhost:27017/samiti_db
   ```

### For Mac:
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

### For Linux:
```bash
sudo apt-get install mongodb
sudo systemctl start mongodb
```

## Running the Application

Once MongoDB is set up, follow these steps:

### 1. Create Admin Account
```bash
node scripts/createAdmin.js
```

### 2. (Optional) Seed Sample Districts
```bash
node scripts/seedDistricts.js
```

### 3. Start Backend Server
```bash
npm run dev
```

### 4. Start Frontend (in a new terminal)
```bash
cd client
npm start
```

## Access the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Default Login Credentials

### State Admin
- Username: admin
- Password: admin123

### Sample Districts (if seeded)
- Rajkot: username: `rajkot_admin`, password: `rajkot123`
- Ahmedabad: username: `ahmedabad_admin`, password: `ahmedabad123`
- Surat: username: `surat_admin`, password: `surat123`
- Vadodara: username: `vadodara_admin`, password: `vadodara123`

## Troubleshooting

### MongoDB Connection Error
- Make sure MongoDB is running
- Check your connection string in `.env`
- For Atlas, ensure your IP is whitelisted

### Port Already in Use
- Change PORT in `.env` file
- Or kill the process using the port

### Module Not Found
- Run `npm install` in root directory
- Run `npm install` in client directory
