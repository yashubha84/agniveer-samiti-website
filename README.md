# અખિલ ગુજરાત અગ્નિવીર સમિતિ (Akhil Gujarat Agniveer Samiti)

A comprehensive full-stack web application for managing the Akhil Gujarat Agniveer Samiti organization, built with Node.js, Express, React, and MongoDB.

## 🏗️ **Project Structure**

```
agniveer-samiti-website/
├── backend/                # Node.js/Express API
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── middleware/        # Custom middleware
│   ├── scripts/           # Database seeding scripts
│   ├── utils/             # Utility functions
│   ├── server.js          # Main server file
│   ├── package.json       # Backend dependencies
│   └── .env               # Environment variables
├── frontend/              # React application
│   ├── public/            # Static files
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── config/        # API configuration
│   │   └── App.js
│   └── package.json       # Frontend dependencies
├── package.json           # Root package.json for scripts
└── README.md
```

## 🌟 Features

### 🏠 **Public Features**
- **Dynamic Leadership Display**: President and Vice President information fetched from database
- **Event Showcase**: Featured events with photo galleries
- **District Information**: All 33 Gujarat districts with unique codes
- **Responsive Design**: Professional red, black, and olive green color scheme
- **Multi-language Support**: Gujarati and English content

### 👥 **Member Management**
- **Member Registration**: Unique ID system for members and volunteers
- **District-wise Organization**: Members organized by Gujarat districts
- **Status Tracking**: Pending, approved, and active member statuses
- **Profile Management**: Complete member information system

### 🎯 **Admin Dashboard**
- **State Admin Panel**: Complete oversight of all districts
- **District Admin Panel**: District-specific management
- **Leadership Management**: Dynamic president/VP assignment
- **Member Approval System**: Review and approve new registrations
- **Statistics Overview**: Real-time counts and analytics

### 📊 **Reports System**
- **PDF Generation**: Professional reports with letterhead
- **Dynamic Pagination**: Exact pages based on data count
- **District-wise Reports**: Separate reports for each district
- **Member and Volunteer Reports**: Comprehensive data export

## 🛠️ **Technology Stack**

### **Backend**
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database with improved connection handling
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **PDFKit** - PDF generation
- **Nodemailer** - Email service
- **bcryptjs** - Password hashing

### **Frontend**
- **React** - UI library
- **React Router** - Navigation
- **Axios** - HTTP client with API base URL configuration
- **CSS3** - Styling with responsive design

## 🚀 **Quick Setup**

### **1. Clone Repository**
```bash
git clone https://github.com/yashubha84/agniveer-samiti-website.git
cd agniveer-samiti-website
```

### **2. Install Dependencies**
```bash
# Install root dependencies (for development scripts)
npm install

# Install backend dependencies
npm run install:backend

# Install frontend dependencies
npm run install:frontend

# Or install all at once
npm run install:all
```

### **3. Backend Setup**
```bash
# Navigate to backend
cd backend

# Create .env file with:
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/samiti_db
JWT_SECRET=your_jwt_secret_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
NODE_ENV=development
PORT=5000

# Seed database
npm run seed:all
```

### **4. Frontend Setup**
```bash
# Update API base URL in frontend/src/config/api.js
# For development: http://localhost:5000
# For production: your deployed backend URL
```

### **5. Run Application**
```bash
# Development mode (runs both backend and frontend)
npm run dev

# Or run separately:
npm run backend    # Backend only (port 5000)
npm run frontend   # Frontend only (port 3000)
```

## 🔧 **MongoDB Connection Fix**

### **Issue**: MongoDB Atlas Connection Failing
The connection might fail due to:
1. **Cluster paused** (MongoDB Atlas free tier)
2. **Network restrictions**
3. **Incorrect connection string**

### **Solutions**:

#### **Option 1: Resume MongoDB Atlas Cluster**
1. Go to https://cloud.mongodb.com
2. Login to your account
3. Check if cluster is paused
4. Click "Resume" if paused

#### **Option 2: Update Connection String**
```env
# Try this format in backend/.env
MONGODB_URI=mongodb+srv://yashpalsinhgohil8427_db_user:cnvaClxNsHAQ7Cpn@cluster0.teo1cp8.mongodb.net/samiti_db?retryWrites=true&w=majority&appName=Cluster0
```

#### **Option 3: Use Local MongoDB**
```bash
# Install MongoDB locally
# Then use:
MONGODB_URI=mongodb://localhost:27017/samiti_db
```

#### **Option 4: Create New MongoDB Atlas Cluster**
1. Create new free cluster at https://mongodb.com/atlas
2. Create database user
3. Whitelist all IPs (0.0.0.0/0)
4. Get new connection string
5. Update backend/.env

## 🌐 **Deployment**

### **Backend Deployment (Railway/Heroku)**
```bash
# Deploy backend to Railway
1. Go to https://railway.app
2. Deploy backend folder
3. Add environment variables
4. Get backend URL

# Deploy backend to Heroku
heroku create agniveer-backend
heroku config:set MONGODB_URI=your_connection_string
heroku config:set JWT_SECRET=your_secret
git subtree push --prefix backend heroku main
```

### **Frontend Deployment (Vercel/Netlify)**
```bash
# Update frontend/src/config/api.js with backend URL
# Deploy frontend folder to Vercel or Netlify
```

### **Full-Stack Deployment Options**
1. **Railway**: Deploy both backend and frontend separately
2. **Heroku**: Use git subtree for backend, Netlify for frontend
3. **DigitalOcean**: Deploy as separate services

## 🔐 **Login Credentials**

### **Default Admin Login**
- **Username**: `state_admin`
- **Password**: `admin123`

### **District Admin**
- Each district has unique login credentials
- Format: District-specific usernames and passwords

## 🎯 **Key Improvements**

### **Separated Architecture**
- ✅ **Backend**: Independent API server
- ✅ **Frontend**: Standalone React app
- ✅ **Better Scalability**: Can deploy separately
- ✅ **Improved Development**: Work on frontend/backend independently

### **Enhanced MongoDB Connection**
- ✅ **Retry Logic**: Automatic reconnection attempts
- ✅ **Better Error Handling**: Detailed connection status
- ✅ **Connection Monitoring**: Event listeners for connection status
- ✅ **Optimized Settings**: Improved connection pool and timeouts

### **API Configuration**
- ✅ **Environment-based URLs**: Different URLs for dev/production
- ✅ **Centralized Config**: Single file for API endpoints
- ✅ **Easy Deployment**: Simple URL updates for deployment

## 🔧 **Development Scripts**

```bash
# Root level commands
npm run dev              # Run both backend and frontend
npm run backend          # Run backend only
npm run frontend         # Run frontend only
npm run install:all      # Install all dependencies
npm run build           # Build frontend for production

# Backend commands (from backend folder)
npm run dev             # Run with nodemon
npm run seed:all        # Seed all data
npm run seed:districts  # Seed districts only
npm run seed:admin      # Create admin user
npm run seed:leadership # Seed leadership data

# Frontend commands (from frontend folder)
npm start              # Development server
npm run build          # Production build
```

## 🌟 **Live Website Features**

Once deployed, your website will have:
- ✅ Homepage with dynamic leadership display
- ✅ Member registration with unique ID generation
- ✅ Admin dashboards for state and district management
- ✅ Event management with photo galleries
- ✅ Professional PDF report generation
- ✅ Responsive design for all devices
- ✅ Secure authentication system
- ✅ Improved database connectivity

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 **License**

This project is licensed under the MIT License.

## 📞 **Support**

For support and queries, please create an issue in the GitHub repository.

---

**Built with ❤️ for અખિલ ગુજરાત અગ્નિવીર સમિતિ**