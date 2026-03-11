# Environment Variables Guide

## What are Environment Variables?

Environment variables are configuration values that your application uses. They're stored in a `.env` file and kept separate from your code for security.

---

## Your .env File

Create or update the `.env` file in your project root:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/samiti_db
JWT_SECRET=agniveer_samiti_secret_key_2024_secure
NODE_ENV=development
```

---

## Variable Explanations

### 1. PORT
```env
PORT=5000
```

**What it does:** Defines which port your backend server runs on.

**Default:** 5000

**When to change:** If port 5000 is already in use by another application.

**Example alternatives:**
```env
PORT=3001
PORT=8000
PORT=5001
```

---

### 2. MONGODB_URI
```env
MONGODB_URI=mongodb://localhost:27017/samiti_db
```

**What it does:** Connection string to your MongoDB database.

**Format:** `mongodb://[username:password@]host[:port]/database[?options]`

#### For Local MongoDB:
```env
MONGODB_URI=mongodb://localhost:27017/samiti_db
```

#### For MongoDB Atlas (Cloud):
```env
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/samiti_db?retryWrites=true&w=majority
```

**Parts explained:**
- `mongodb://` or `mongodb+srv://` - Protocol
- `username:password@` - Credentials (if required)
- `localhost:27017` or `cluster0.xxxxx.mongodb.net` - Host
- `samiti_db` - Database name
- `?retryWrites=true&w=majority` - Options

**Real Example (Atlas):**
```env
MONGODB_URI=mongodb+srv://samiti_admin:MyPassword123@cluster0.abc123.mongodb.net/samiti_db?retryWrites=true&w=majority
```

**Important:**
- Replace `<password>` with your actual password
- No spaces in the connection string
- Special characters in password must be URL-encoded

---

### 3. JWT_SECRET
```env
JWT_SECRET=agniveer_samiti_secret_key_2024_secure
```

**What it does:** Secret key used to sign authentication tokens (JWT).

**Security:** This should be a long, random string.

**How to generate a secure secret:**

#### Method 1: Node.js
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

#### Method 2: Online Generator
Visit: https://randomkeygen.com/

#### Method 3: Manual
Use a long random string (at least 32 characters):
```env
JWT_SECRET=aG8s9Kp2mN4vB7xC1qW5eR3tY6uI0oP9lK8jH7gF5dS4aZ2xC1vB0nM3
```

**Important:**
- Never share this secret
- Change it in production
- Keep it long and random

---

### 4. NODE_ENV
```env
NODE_ENV=development
```

**What it does:** Tells your application which environment it's running in.

**Options:**
- `development` - For local development
- `production` - For live/production server
- `test` - For running tests

**When to change:**
- Keep as `development` while building
- Change to `production` when deploying

---

## Complete Examples

### Example 1: Local Development
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/samiti_db
JWT_SECRET=my_super_secret_key_for_development_only
NODE_ENV=development
```

### Example 2: MongoDB Atlas (Cloud)
```env
PORT=5000
MONGODB_URI=mongodb+srv://samiti_admin:SecurePass123@cluster0.abc123.mongodb.net/samiti_db?retryWrites=true&w=majority
JWT_SECRET=aG8s9Kp2mN4vB7xC1qW5eR3tY6uI0oP9lK8jH7gF5dS4aZ2xC1vB0nM3
NODE_ENV=development
```

### Example 3: Production
```env
PORT=5000
MONGODB_URI=mongodb+srv://prod_user:VerySecurePassword456@production-cluster.xyz789.mongodb.net/samiti_production?retryWrites=true&w=majority
JWT_SECRET=xK9mP2nQ5rS8tU1vW4yZ7aC0bD3eF6gH9iJ2kL5mN8oP1qR4sT7uV0wX3yZ6
NODE_ENV=production
```

---

## How to Use

### Step 1: Create .env file
```bash
# Copy the example file
cp .env.example .env
```

### Step 2: Edit .env file
Open `.env` in any text editor and update the values.

### Step 3: Never commit .env
The `.env` file is already in `.gitignore` - never commit it to Git!

### Step 4: Test connection
```bash
node test-connection.js
```

---

## Troubleshooting

### Error: "Cannot find module 'dotenv'"
```bash
npm install dotenv
```

### Error: "MONGODB_URI is not defined"
- Check if `.env` file exists in project root
- Verify variable name is exactly `MONGODB_URI`
- Restart your server after changing `.env`

### Error: "Authentication failed"
- Check username and password in MONGODB_URI
- Ensure no spaces in connection string
- URL-encode special characters in password

### Error: "Connection timeout"
- Check internet connection
- Verify MongoDB Atlas IP whitelist
- Check firewall settings

---

## Security Best Practices

1. ✅ **Never commit .env to Git**
2. ✅ **Use different secrets for dev/prod**
3. ✅ **Generate strong JWT secrets**
4. ✅ **Restrict MongoDB user permissions**
5. ✅ **Use environment-specific databases**
6. ✅ **Rotate secrets regularly**
7. ✅ **Keep .env.example updated** (without real values)

---

## Quick Reference

| Variable | Purpose | Example |
|----------|---------|---------|
| PORT | Server port | 5000 |
| MONGODB_URI | Database connection | mongodb://localhost:27017/samiti_db |
| JWT_SECRET | Auth token secret | random_64_char_string |
| NODE_ENV | Environment | development |

---

## Need Help?

See these files for more information:
- `MONGODB_SETUP.md` - MongoDB setup guide
- `DATABASE_SCHEMA.md` - Database structure
- `QUICK_START.md` - Quick start guide
- `README.md` - Full documentation
