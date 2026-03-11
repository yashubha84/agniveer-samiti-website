const nodemailer = require('nodemailer');

// Create transporter
const createTransporter = () => {
  // Check if email is configured
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    console.log('Email not configured. Skipping email send.');
    return null;
  }

  return nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });
};

// Send member registration email
const sendMemberRegistrationEmail = async (memberData) => {
  try {
    const transporter = createTransporter();
    
    // If email not configured, skip sending
    if (!transporter) {
      console.log('Email not configured. Registration email not sent.');
      return { success: false, error: 'Email not configured' };
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: memberData.email,
      subject: 'Registration Successful - અખિલ ગુજરાત અગ્નિવીર સમિતિ',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <h2 style="color: #2563eb; text-align: center;">અખિલ ગુજરાત અગ્નિવીર સમિતિ</h2>
          <h3 style="color: #333;">Registration Successful!</h3>
          
          <p>Dear <strong>${memberData.fullName}</strong>,</p>
          
          <p>Thank you for registering with અખિલ ગુજરાત અગ્નિવીર સમિતિ (Akhil Gujarat Agniveer Samiti). Your registration has been received and is pending approval from your district admin.</p>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h4 style="margin-top: 0; color: #2563eb;">Your Registration Details:</h4>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Member ID:</td>
                <td style="padding: 8px 0;">${memberData.memberId}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Full Name:</td>
                <td style="padding: 8px 0;">${memberData.fullName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Army Number:</td>
                <td style="padding: 8px 0;">${memberData.armyNumber}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">District:</td>
                <td style="padding: 8px 0;">${memberData.district}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Mobile Number:</td>
                <td style="padding: 8px 0;">${memberData.phone}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Email:</td>
                <td style="padding: 8px 0;">${memberData.email}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Status:</td>
                <td style="padding: 8px 0; color: orange; font-weight: bold;">PENDING APPROVAL</td>
              </tr>
            </table>
          </div>
          
          <div style="background-color: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
            <h4 style="margin-top: 0; color: #92400e;">Important - Save Your Login Credentials:</h4>
            <p style="margin: 5px 0;"><strong>Army Number:</strong> ${memberData.armyNumber}</p>
            <p style="margin: 5px 0;"><strong>Mobile Number:</strong> ${memberData.phone}</p>
            <p style="margin: 10px 0 0 0; font-size: 14px; color: #92400e;">
              You will use these credentials to login once your membership is approved.
            </p>
          </div>
          
          <div style="margin: 20px 0;">
            <h4 style="color: #333;">Next Steps:</h4>
            <ol style="line-height: 1.8;">
              <li>Your application will be reviewed by the ${memberData.district} district admin</li>
              <li>You will receive an email notification once approved</li>
              <li>After approval, you can login using your Army Number and Mobile Number</li>
            </ol>
          </div>
          
          <div style="background-color: #e0f2fe; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; font-size: 14px; color: #0c4a6e;">
              <strong>Note:</strong> Please keep this email safe for your records. Your Member ID and login credentials are important for accessing your account.
            </p>
          </div>
          
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          
          <p style="font-size: 12px; color: #666; text-align: center;">
            This is an automated email. Please do not reply to this message.<br>
            For any queries, please contact your district admin or visit our website.
          </p>
          
          <p style="text-align: center; color: #2563eb; font-weight: bold; margin-top: 20px;">
            અખિલ ગુજરાત અગ્નિવીર સમિતિ<br>
            Akhil Gujarat Agniveer Samiti
          </p>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error.message };
  }
};

// Send approval notification email
const sendApprovalEmail = async (memberData) => {
  try {
    const transporter = createTransporter();
    
    // If email not configured, skip sending
    if (!transporter) {
      console.log('Email not configured. Approval email not sent.');
      return { success: false, error: 'Email not configured' };
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: memberData.email,
      subject: 'Membership Approved - અખિલ ગુજરાત અગ્નિવીર સમિતિ',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <h2 style="color: #2563eb; text-align: center;">અખિલ ગુજરાત અગ્નિવીર સમિતિ</h2>
          <h3 style="color: #16a34a;">🎉 Membership Approved!</h3>
          
          <p>Dear <strong>${memberData.fullName}</strong>,</p>
          
          <p>Congratulations! Your membership with અખિલ ગુજરાત અગ્નિવીર સમિતિ has been <strong style="color: #16a34a;">APPROVED</strong> by your district admin.</p>
          
          <div style="background-color: #dcfce7; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #16a34a;">
            <h4 style="margin-top: 0; color: #166534;">You can now login to your account!</h4>
            <p style="margin: 5px 0;"><strong>Member ID:</strong> ${memberData.memberId}</p>
            <p style="margin: 5px 0;"><strong>Login with:</strong></p>
            <ul style="margin: 10px 0;">
              <li>Army Number: ${memberData.armyNumber}</li>
              <li>Mobile Number: ${memberData.phone}</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="http://localhost:3001/login" style="background-color: #2563eb; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">
              Login Now
            </a>
          </div>
          
          <div style="margin: 20px 0;">
            <h4 style="color: #333;">What's Next?</h4>
            <ul style="line-height: 1.8;">
              <li>Access your member dashboard</li>
              <li>View upcoming events</li>
              <li>Stay connected with your district</li>
              <li>Participate in community activities</li>
            </ul>
          </div>
          
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          
          <p style="font-size: 12px; color: #666; text-align: center;">
            This is an automated email. Please do not reply to this message.<br>
            For any queries, please contact your district admin.
          </p>
          
          <p style="text-align: center; color: #2563eb; font-weight: bold; margin-top: 20px;">
            અખિલ ગુજરાત અગ્નિવીર સમિતિ<br>
            Akhil Gujarat Agniveer Samiti
          </p>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Approval email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending approval email:', error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendMemberRegistrationEmail,
  sendApprovalEmail
};
