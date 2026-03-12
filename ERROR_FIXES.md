# 🔧 Common Deployment Errors & Fixes

## ❌ **Most Common Errors & Solutions**

### **1. Build Failed - react-scripts not found**
**Error**: `react-scripts: not found`
**Fix**: ✅ Already fixed - moved react-scripts to dependencies

### **2. Environment Variables Missing**
**Error**: `Environment Variable "MONGODB_URI" references Secret "mongodb_uri", which does not exist`
**Fix**: ✅ Already fixed - removed secret references from vercel.json

### **3. Module Not Found Errors**
**Error**: `Cannot find module 'xyz'`
**Fix**: 
```bash
# Run these commands locally to ensure all dependencies are installed
npm install
cd client && npm install
```

### **4. Build Command Issues**
**Error**: Build fails during deployment
**Fix**: Use these exact build settings:

#### **For Vercel:**
- **Framework Preset**: Other
- **Root Directory**: `./`
- **Build Command**: `npm run build`
- **Output Directory**: `client/build`
- **Install Command**: `npm install && cd client && npm install`

#### **For Railway:**
- **Build Command**: `npm run build`
- **Start Command**: `npm start`

### **5. CORS Errors**
**Error**: `Access to fetch at 'api/...' from origin '...' has been blocked by CORS policy`
**Fix**: ✅ Already fixed - updated CORS configuration for production

### **6. Database Connection Issues**
**Error**: `MongoNetworkError` or `Authentication failed`
**Fix**: 
1. Check MongoDB Atlas whitelist (use 0.0.0.0/0)
2. Verify connection string format
3. Ensure database user has proper permissions

### **7. Port Issues**
**Error**: `Port already in use` or `EADDRINUSE`
**Fix**: ✅ Already configured - uses process.env.PORT for deployment

---

## 🚀 **Step-by-Step Deployment Fix**

### **Option 1: Vercel (Updated Configuration)**

1. **Delete** current failed deployment in Vercel
2. **Import** repository again: `yashubha84/agniveer-samiti-website`
3. **Use these exact settings**:
   ```
   Framework Preset: Other
   Root Directory: ./
   Build Command: npm run build
   Output Directory: client/build
   Install Command: npm install && cd client && npm install
   ```
4. **Add Environment Variables**:
   ```
   MONGODB_URI = mongodb+srv://yashpalsinhgohil8427_db_user:cnvaClxNsHAQ7Cpn@cluster0.teo1cp8.mongodb.net/samiti_db?retryWrites=true&w=majority
   JWT_SECRET = 0fc29d71202077f8f032dd2f12e554c31df2426a724593911f5bc4e3db97d458bbe56f83dd30038d159290bd2a3ae406af146d875d99df581ee826f705fa89d6
   NODE_ENV = production
   PORT = 5000
   ```
5. **Deploy**

### **Option 2: Railway (Recommended - Easier)**

1. **Go to**: https://railway.app
2. **Sign up** with GitHub
3. **Deploy from GitHub repo**: `yashubha84/agniveer-samiti-website`
4. **Add Environment Variables** (same as above)
5. **Deploy** - Railway handles everything automatically

### **Option 3: Render**

1. **Go to**: https://render.com
2. **New Web Service** from GitHub
3. **Build Command**: `npm install && cd client && npm install && npm run build`
4. **Start Command**: `npm start`
5. **Add Environment Variables**
6. **Deploy**

---

## 🔍 **Debugging Steps**

### **If Build Still Fails:**

1. **Check Build Logs** in deployment platform
2. **Look for specific error messages**
3. **Common issues**:
   - Missing dependencies
   - Wrong Node.js version
   - Environment variable typos
   - Build command errors

### **If App Deploys but Doesn't Work:**

1. **Check Runtime Logs**
2. **Common issues**:
   - Database connection failed
   - CORS errors
   - Missing environment variables
   - API route errors

### **Local Testing:**

```bash
# Test production build locally
npm run build
npm start

# Check if build folder exists
ls client/build

# Test with production environment
NODE_ENV=production npm start
```

---

## ✅ **What's Already Fixed**

- ✅ **react-scripts**: Moved to dependencies
- ✅ **Environment variables**: Removed secret references
- ✅ **Build commands**: Updated and improved
- ✅ **CORS**: Configured for production
- ✅ **Server**: Properly serves React build
- ✅ **Dependencies**: All properly configured

---

## 🎯 **Expected Success**

After following these fixes, your deployment should:
- ✅ Build successfully
- ✅ Start without errors
- ✅ Serve the React app
- ✅ Connect to MongoDB
- ✅ Handle API requests
- ✅ Display leadership dynamically

**If you're still getting errors, please share the specific error message and I'll provide a targeted fix!**