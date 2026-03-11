# 🚀 Live Website Deployment Guide

## 🌐 **Quick Deploy Options**

### **Option 1: Vercel (Easiest - Full Stack)**

#### **Step 1: Deploy to Vercel**
1. Go to https://vercel.com
2. Sign up/Login with GitHub
3. Click "New Project"
4. Import your repository: `yashubha84/agniveer-samiti-website`
5. Configure:
   - **Framework Preset**: Other
   - **Root Directory**: ./
   - **Build Command**: `cd client && npm run build`
   - **Output Directory**: `client/build`

#### **Step 2: Add Environment Variables**
In Vercel dashboard, go to Settings > Environment Variables:
```
MONGODB_URI = mongodb+srv://username:password@cluster.mongodb.net/samiti_db
JWT_SECRET = your_jwt_secret_here
NODE_ENV = production
EMAIL_USER = your_email@gmail.com
EMAIL_PASS = your_app_password
```

#### **Step 3: Deploy**
- Click "Deploy"
- Your site will be live at: `https://your-project-name.vercel.app`

---

### **Option 2: Netlify + Railway (Separate Frontend/Backend)**

#### **Frontend on Netlify:**
1. Go to https://netlify.com
2. Connect GitHub repository
3. Build settings:
   - **Base directory**: `client`
   - **Build command**: `npm run build`
   - **Publish directory**: `client/build`

#### **Backend on Railway:**
1. Go to https://railway.app
2. Deploy from GitHub
3. Add environment variables
4. Update `netlify.toml` with your Railway backend URL

---

### **Option 3: Heroku (Full Stack)**

#### **Step 1: Install Heroku CLI**
Download from: https://devcenter.heroku.com/articles/heroku-cli

#### **Step 2: Deploy Commands**
```bash
# Login to Heroku
heroku login

# Create Heroku app
heroku create agniveer-samiti-website

# Add MongoDB addon (or use MongoDB Atlas)
heroku addons:create mongolab:sandbox

# Set environment variables
heroku config:set JWT_SECRET=your_jwt_secret
heroku config:set NODE_ENV=production

# Deploy
git push heroku main
```

---

### **Option 4: Render (Full Stack)**

1. Go to https://render.com
2. Connect GitHub repository
3. Create Web Service:
   - **Build Command**: `npm install && cd client && npm install && npm run build`
   - **Start Command**: `node server.js`
4. Add environment variables
5. Deploy

---

## 🗄️ **Database Setup (MongoDB Atlas)**

### **Step 1: Create MongoDB Atlas Account**
1. Go to https://mongodb.com/atlas
2. Create free account
3. Create cluster (free tier)

### **Step 2: Setup Database**
1. Create database user
2. Whitelist IP addresses (0.0.0.0/0 for all)
3. Get connection string
4. Replace in environment variables

### **Step 3: Seed Database**
After deployment, run these commands locally with production MongoDB URI:
```bash
# Update .env with production MongoDB URI
node scripts/seedGujaratDistricts.js
node scripts/createAdmin.js
node scripts/seedLeadership.js
```

---

## ⚡ **Fastest Deployment (Recommended)**

### **Using Vercel (5 minutes setup):**

1. **Fork/Import to Vercel**:
   - Go to https://vercel.com/new
   - Import `yashubha84/agniveer-samiti-website`

2. **Environment Variables**:
   ```
   MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/samiti_db
   JWT_SECRET=your_secret_key_here
   NODE_ENV=production
   ```

3. **Deploy**: Click Deploy button

4. **Your live website**: `https://agniveer-samiti-website.vercel.app`

---

## 🔧 **Post-Deployment Setup**

### **1. Update API URLs (if needed)**
If using separate frontend/backend, update API URLs in React components.

### **2. Test Features**
- ✅ Home page loads
- ✅ Leadership photos display
- ✅ Member registration works
- ✅ Admin login functions
- ✅ Reports generate

### **3. Custom Domain (Optional)**
- Purchase domain
- Configure DNS in deployment platform
- Add SSL certificate (usually automatic)

---

## 🌟 **Expected Live Website Features**

Once deployed, your website will have:

🏠 **Homepage**: 
- Dynamic leadership display
- Event carousel
- Professional design

👥 **Member System**:
- Registration forms
- Unique ID generation
- District-wise organization

📊 **Admin Dashboards**:
- State admin panel
- District management
- Member approvals

📄 **Reports**:
- PDF generation
- Professional letterhead
- District-wise reports

🎪 **Events**:
- Event management
- Photo galleries
- Calendar system

---

## 🚀 **Quick Start Commands**

Choose your preferred platform and follow the guide above. Your website will be live within 10-15 minutes!

**Recommended**: Start with Vercel for the easiest full-stack deployment.