const nodemailer = require('nodemailer');
require('dotenv').config();

console.log('Testing Email Configuration...\n');
console.log('EMAIL_SERVICE:', process.env.EMAIL_SERVICE);
console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_PASSWORD:', process.env.EMAIL_PASSWORD ? '***configured***' : 'NOT SET');
console.log('');

if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
  console.log('❌ Email not configured!');
  console.log('Please set EMAIL_USER and EMAIL_PASSWORD in .env file');
  console.log('');
  console.log('For Gmail:');
  console.log('1. Enable 2FA: https://myaccount.google.com/security');
  console.log('2. Generate App Password: https://myaccount.google.com/apppasswords');
  console.log('3. Add to .env:');
  console.log('   EMAIL_USER=your-email@gmail.com');
  console.log('   EMAIL_PASSWORD=your-16-char-app-password');
  process.exit(1);
}

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

console.log('Sending test email...');

const mailOptions = {
  from: process.env.EMAIL_USER,
  to: process.env.EMAIL_USER, // Send to yourself
  subject: 'Test Email - અખિલ ગુજરાત અગ્નિવીર સમિતિ',
  html: `
    <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
      <h2 style="color: #2563eb;">અખિલ ગુજરાત અગ્નિવીર સમિતિ</h2>
      <h3>Email System Test</h3>
      <p>This is a test email from your Samiti Management System.</p>
      <p>If you received this email, your email configuration is working correctly! ✅</p>
      <hr>
      <p style="font-size: 12px; color: #666;">
        Sent at: ${new Date().toLocaleString()}<br>
        From: ${process.env.EMAIL_USER}
      </p>
    </div>
  `
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log('❌ Email sending failed!');
    console.log('Error:', error.message);
    console.log('');
    console.log('Common issues:');
    console.log('- Using regular password instead of App Password');
    console.log('- 2FA not enabled on Gmail');
    console.log('- Wrong email or password');
    console.log('- Network/firewall blocking SMTP');
    process.exit(1);
  } else {
    console.log('✅ Email sent successfully!');
    console.log('Message ID:', info.messageId);
    console.log('');
    console.log('Check your inbox:', process.env.EMAIL_USER);
    console.log('(Check spam folder if not in inbox)');
    process.exit(0);
  }
});
