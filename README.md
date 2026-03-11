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

### 🎪 **Events Management**
- **Event Creation**: State and district level events
- **Photo Galleries**: Multiple photos per event
- **Event Calendar**: Upcoming and past events
- **District-specific Events**: Targeted event management

### 🔔 **Notifications**
- **Announcement System**: State-wide and district-specific notifications
- **Real-time Updates**: Latest announcements on homepage
- **Admin Broadcasting**: Send notifications to all districts

### 💬 **Feedback System**
- **User Feedback**: Rating and comment system
- **District-wise Feedback**: Organized feedback collection
- **Admin Review**: Feedback management and response

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

### **Database Schema**
- **7 Collections**: Admins, Districts, Members, Volunteers, Events, Notifications, Feedback, Leadership
- **Unique ID System**: Auto-generated IDs for members and volunteers
- **Relational Structure**: Proper references between collections

## 🚀 **Installation & Setup**

### **Prerequisites**
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- Git

### **1. Clone Repository**
```bash
git clone https://github.com/yourusername/agniveer-samiti-website.git
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
MONGODB_URI=mongodb://localhost:27017/samiti_db
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
# Development mode (runs both server and client)
npm run dev

# Or run separately:
# Server only
npm start

# Client only (in another terminal)
cd client
npm start
```

## 📁 **Project Structure**

```
agniveer-samiti-website/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/         # Page components
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

## 🔐 **Authentication & Authorization**

### **User Roles**
- **State Admin**: Full system access
- **District Admin**: District-specific access
- **Public**: Limited read access

### **Login Credentials**
- **State Admin**: `state_admin` / `admin123`
- **District Admin**: District-specific usernames and passwords

## 🌐 **API Endpoints**

### **Public Routes**
- `GET /api/leadership` - Get leadership information
- `GET /api/events` - Get all events
- `GET /api/notifications` - Get notifications
- `GET /api/districts` - Get all districts

### **Protected Routes**
- `POST /api/members` - Create member
- `POST /api/volunteers` - Create volunteer
- `POST /api/events` - Create event
- `GET /api/reports/:type` - Generate reports

## 📱 **Responsive Design**

- **Mobile-first approach**
- **Breakpoints**: 480px, 768px, 992px
- **Professional color scheme**: Red (#8B0000), Olive Green (#556B2F), Dark Gray (#2F2F2F)
- **Accessible design** with proper contrast ratios

## 🔧 **Key Features Implementation**

### **Dynamic Leadership System**
- Database-driven president/VP information
- Admin panel for leadership management
- Automatic updates across the website

### **Reports Generation**
- Professional PDF reports with letterhead
- Dynamic pagination based on actual data
- District-wise and consolidated reports

### **Unique ID System**
- Auto-generated member IDs: `AG-{districtCode}-M-{number}`
- Auto-generated volunteer IDs: `AG-{districtCode}-V-{number}`

### **Event Photo Galleries**
- Multiple photos per event
- Thumbnail previews
- Error handling for missing images

## 🚀 **Deployment**

### **Production Setup**
1. Set `NODE_ENV=production` in environment variables
2. Update MongoDB URI for production database
3. Configure email service credentials
4. Build React app: `cd client && npm run build`
5. Deploy to your preferred hosting service

### **Recommended Hosting**
- **Backend**: Heroku, DigitalOcean, AWS
- **Database**: MongoDB Atlas
- **Frontend**: Netlify, Vercel (if separate deployment)

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 **Support**

For support and queries, please contact the development team or create an issue in the GitHub repository.

---

**Built with ❤️ for અખિલ ગુજરાત અગ્નિવીર સમિતિ**