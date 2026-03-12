# અખિલ ગુજરાત અગ્નિવીર સમિતિ (Akhil Gujarat Agniveer Samiti)

A comprehensive full-stack web application for managing the Akhil Gujarat Agniveer Samiti organization, built with Node.js, Express, React, and MongoDB.

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
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **PDFKit** - PDF generation
- **Nodemailer** - Email service
- **bcryptjs** - Password hashing

### **Frontend**
- **React** - UI library
- **React Router** - Navigation
- **Axios** - HTTP client
- **CSS3** - Styling with responsive design

## 🚀 **Quick Setup**

### **1. Clone Repository**
```bash
git clone https://github.com/yashubha84/agniveer-samiti-website.git
cd agniveer-samiti-website
```

### **2. Install Dependencies**
```bash
# Install server dependencies
npm install

# Install client dependencies
cd client
npm install
cd ..
```

### **3. Environment Setup**
Create a `.env` file in the root directory:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/samiti_db
JWT_SECRET=your_jwt_secret_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
NODE_ENV=development
PORT=5000
```

### **4. Database Setup**
```bash
# Seed Gujarat districts
node scripts/seedGujaratDistricts.js

# Create admin user
node scripts/createAdmin.js

# Seed leadership data
node scripts/seedLeadership.js
```

### **5. Run Application**
```bash
# Development mode
npm run dev

# Or run separately:
npm start          # Server only
cd client && npm start  # Client only
```

## 🌐 **Live Deployment**

### **Option 1: Railway (Recommended)**
1. Go to https://railway.app
2. Sign up with GitHub
3. Deploy from GitHub repo: `yashubha84/agniveer-samiti-website`
4. Add environment variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   NODE_ENV=production
   PORT=5000
   ```
5. Deploy automatically

### **Option 2: Vercel**
1. Go to https://vercel.com
2. Import GitHub repository
3. Configure:
   - Framework: Other
   - Build Command: `npm run build`
   - Output Directory: `client/build`
   - Install Command: `npm install && cd client && npm install`
4. Add same environment variables
5. Deploy

### **Option 3: Heroku**
```bash
# Install Heroku CLI
heroku login
heroku create agniveer-samiti-website
heroku config:set MONGODB_URI=your_connection_string
heroku config:set JWT_SECRET=your_secret
heroku config:set NODE_ENV=production
git push heroku main
```

## 🗄️ **MongoDB Atlas Setup**

### **Create Database**
1. Go to https://mongodb.com/atlas
2. Create free account and cluster
3. Create database user
4. Whitelist all IPs (0.0.0.0/0)
5. Get connection string
6. Replace in environment variables

### **Seed Database (After Deployment)**
Run these commands locally with production MongoDB URI:
```bash
node scripts/seedGujaratDistricts.js
node scripts/createAdmin.js
node scripts/seedLeadership.js
```

## 🔐 **Login Credentials**

### **Default Admin Login**
- **Username**: `state_admin`
- **Password**: `admin123`

### **District Admin**
- Each district has unique login credentials
- Format: District-specific usernames and passwords

## 🎯 **Key Features**

### **Dynamic Leadership System**
- Database-driven president/VP information
- Admin panel for leadership management
- Automatic updates across the website

### **Unique ID System**
- Member IDs: `AG-{districtCode}-M-{number}`
- Volunteer IDs: `AG-{districtCode}-V-{number}`

### **Professional Reports**
- PDF generation with letterhead
- Dynamic pagination based on data
- District-wise and consolidated reports

### **Event Management**
- Photo galleries with multiple images
- Event creation and management
- District-specific events

## 🔧 **Common Issues & Fixes**

### **MongoDB Connection Issues**
- Ensure MongoDB Atlas cluster is not paused
- Check connection string format
- Verify network access (whitelist 0.0.0.0/0)

### **Build Errors**
- Ensure `react-scripts` is in dependencies (not devDependencies)
- Use correct build commands for deployment platform
- Check Node.js version compatibility

### **Environment Variables**
- Double-check variable names (case-sensitive)
- Ensure all required variables are set
- Use production MongoDB URI for deployment

### **CORS Errors**
- Server is configured for production domains
- Update CORS origins if using custom domain

## 📁 **Project Structure**

```
agniveer-samiti-website/
├── client/                 # React frontend
│   ├── public/            # Static files
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/        # Page components
│   │   └── App.js
│   └── package.json
├── models/                # MongoDB models
├── routes/                # API routes
├── middleware/            # Custom middleware
├── scripts/               # Database seeding scripts
├── utils/                 # Utility functions
├── server.js              # Main server file
├── package.json
└── README.md
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