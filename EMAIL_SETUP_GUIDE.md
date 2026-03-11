# Email Notification System Setup Guide

## Overview
The system automatically sends emails to members when:
1. **Registration** - Member receives their Member ID and login credentials
2. **Approval** - Member receives notification that they can now login

## Email Configuration

### Step 1: Setup Gmail App Password

Since Gmail requires App Passwords for third-party applications, follow these steps:

1. **Enable 2-Factor Authentication** (if not already enabled)
   - Go to https://myaccount.google.com/security
   - Click on "2-Step Verification"
   - Follow the setup process

2. **Generate App Password**
   - Go to https://myaccount.google.com/apppasswords
   - Select "Mail" as the app
   - Select "Other" as the device and name it "Samiti Website"
   - Click "Generate"
   - Copy the 16-character password (remove spaces)

3. **Update .env File**
   ```env
   EMAIL_SERVICE=gmail
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=abcd efgh ijkl mnop  (the 16-char app password)
   ```

### Step 2: Alternative Email Services

If you want to use a different email service:

#### Outlook/Hotmail
```env
EMAIL_SERVICE=hotmail
EMAIL_USER=your-email@outlook.com
EMAIL_PASSWORD=your-password
```

#### Yahoo
```env
EMAIL_SERVICE=yahoo
EMAIL_USER=your-email@yahoo.com
EMAIL_PASSWORD=your-password
```

#### Custom SMTP
```env
EMAIL_SERVICE=custom
EMAIL_HOST=smtp.yourdomain.com
EMAIL_PORT=587
EMAIL_USER=your-email@yourdomain.com
EMAIL_PASSWORD=your-password
```

### Step 3: Test Email Configuration

Run this test script to verify email is working:

```bash
node -e "const nodemailer = require('nodemailer'); require('dotenv').config(); const transporter = nodemailer.createTransporter({ service: process.env.EMAIL_SERVICE, auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASSWORD } }); transporter.sendMail({ from: process.env.EMAIL_USER, to: process.env.EMAIL_USER, subject: 'Test Email', text: 'Email configuration is working!' }, (err, info) => { if (err) { console.error('Error:', err); } else { console.log('Email sent:', info.messageId); } process.exit(0); });"
```

## Email Templates

### 1. Registration Email
Sent immediately after member registration.

**Contains:**
- Welcome message
- Member ID
- Full registration details
- Army Number (for login)
- Mobile Number (for login)
- Status: Pending Approval
- Next steps information

### 2. Approval Email
Sent when district admin approves the member.

**Contains:**
- Congratulations message
- Member ID
- Login credentials reminder
- Login button/link
- What's next information

## Email Features

### Professional Design
- Responsive HTML email template
- Color-coded sections
- Clear call-to-action buttons
- Mobile-friendly layout

### Important Information Highlighted
- Member ID in prominent box
- Login credentials in warning-style box
- Status clearly indicated with colors

### Bilingual Branding
- અખિલ ગુજરાત અગ્નિવીર સમિતિ (Gujarati)
- Akhil Gujarat Agniveer Samiti (English)

## Troubleshooting

### Email Not Sending

1. **Check Environment Variables**
   ```bash
   node -e "require('dotenv').config(); console.log('EMAIL_USER:', process.env.EMAIL_USER); console.log('EMAIL_PASSWORD:', process.env.EMAIL_PASSWORD ? 'Set' : 'Not Set');"
   ```

2. **Verify Gmail App Password**
   - Make sure you're using App Password, not regular password
   - Remove any spaces from the 16-character password
   - Ensure 2FA is enabled on your Google account

3. **Check Gmail Security Settings**
   - Go to https://myaccount.google.com/lesssecureapps
   - This should be OFF (we're using App Password instead)

4. **Check Server Logs**
   - Look for email errors in the backend console
   - Emails are sent asynchronously, so registration will succeed even if email fails

### Common Errors

**"Invalid login"**
- Using regular password instead of App Password
- App Password has spaces (remove them)

**"Connection timeout"**
- Firewall blocking SMTP port 587
- Network issues

**"Authentication failed"**
- Wrong email or password
- 2FA not enabled
- App Password not generated

## Testing the System

### Test Member Registration Email

1. Register a new member with your email address
2. Check your inbox for registration email
3. Verify all details are correct

### Test Approval Email

1. Login as district admin
2. Approve a pending member
3. Check member's email for approval notification

## Email Sending Flow

```
Member Registers
    ↓
Save to Database
    ↓
Generate Member ID
    ↓
Send Registration Email (async)
    ↓
Return Success Response
    ↓
(Email sends in background)
```

```
District Admin Approves
    ↓
Update Status to "Approved"
    ↓
Send Approval Email (async)
    ↓
Return Success Response
    ↓
(Email sends in background)
```

## Important Notes

1. **Emails are Asynchronous**: Registration/approval will succeed even if email fails
2. **Check Spam Folder**: First emails might go to spam
3. **Production**: Use a dedicated email account for production
4. **Rate Limits**: Gmail has sending limits (500 emails/day for free accounts)
5. **Email Logs**: Check backend console for email sending status

## Security Best Practices

1. **Never commit .env file** to version control
2. **Use App Passwords** instead of regular passwords
3. **Rotate passwords** regularly
4. **Use dedicated email** for the application
5. **Monitor email logs** for suspicious activity

## Production Recommendations

For production deployment, consider:

1. **Professional Email Service**
   - SendGrid (99,000 free emails/month)
   - Mailgun (5,000 free emails/month)
   - Amazon SES (62,000 free emails/month)

2. **Custom Domain Email**
   - Use your own domain (e.g., noreply@samiti.org)
   - More professional appearance
   - Better deliverability

3. **Email Queue System**
   - Use Bull or Bee-Queue for email queuing
   - Retry failed emails automatically
   - Better performance

## Support

If emails are not working:
1. Check the troubleshooting section above
2. Verify .env configuration
3. Test with the test script provided
4. Check backend console logs
5. Verify Gmail App Password is correct

## Example .env Configuration

```env
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/samiti_db
JWT_SECRET=your-secret-key
NODE_ENV=development

# Email Configuration
EMAIL_SERVICE=gmail
EMAIL_USER=samiti.notifications@gmail.com
EMAIL_PASSWORD=abcdefghijklmnop
```

Replace with your actual credentials!
