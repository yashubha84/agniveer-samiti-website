const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const Member = require('../models/Member');
const District = require('../models/District');
const nodemailer = require('nodemailer');

// Create email transporter
const createTransporter = () => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    console.log('Email not configured');
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

// Send email to all members
router.post('/send-to-all', auth, async (req, res) => {
  try {
    if (req.user.role !== 'state_admin') {
      return res.status(403).json({ error: 'Only state admin can send emails to all members' });
    }

    const { subject, message, districtId, status } = req.body;

    if (!subject || !message) {
      return res.status(400).json({ error: 'Subject and message are required' });
    }

    // Build query
    let query = {};
    if (districtId && districtId !== 'all') {
      query.district = districtId;
    }
    if (status && status !== 'all') {
      query.status = status;
    }

    const members = await Member.find(query).populate('district', 'name');

    if (members.length === 0) {
      return res.status(404).json({ error: 'No members found' });
    }

    const transporter = createTransporter();
    if (!transporter) {
      return res.status(500).json({ error: 'Email service not configured' });
    }

    let successCount = 0;
    let failCount = 0;

    // Send emails
    for (const member of members) {
      try {
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: member.email,
          subject: subject,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
              <h2 style="color: #C53030; text-align: center;">AKHIL GUJARAT AGNIVEER SANGATHAN</h2>
              <h3 style="color: #333;">${subject}</h3>
              
              <p>Dear <strong>${member.fullName}</strong>,</p>
              
              <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                ${message.replace(/\n/g, '<br>')}
              </div>
              
              <div style="margin-top: 20px; padding: 15px; background-color: #e0f2fe; border-radius: 8px;">
                <p style="margin: 0; font-size: 14px;"><strong>Your Details:</strong></p>
                <p style="margin: 5px 0;">Member ID: ${member.memberId}</p>
                <p style="margin: 5px 0;">District: ${member.district?.name || 'N/A'}</p>
              </div>
              
              <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
              
              <p style="font-size: 12px; color: #666; text-align: center;">
                This is an official communication from Akhil Gujarat Agniveer Sangathan.<br>
                For any queries, please contact your district admin.
              </p>
              
              <p style="text-align: center; color: #C53030; font-weight: bold; margin-top: 20px;">
                AKHIL GUJARAT AGNIVEER SANGATHAN
              </p>
            </div>
          `
        };

        await transporter.sendMail(mailOptions);
        successCount++;
      } catch (error) {
        console.error(`Failed to send email to ${member.email}:`, error);
        failCount++;
      }
    }

    res.json({
      success: true,
      message: `Emails sent successfully to ${successCount} members. Failed: ${failCount}`,
      successCount,
      failCount,
      totalMembers: members.length
    });

  } catch (err) {
    console.error('Error sending emails:', err);
    res.status(500).json({ error: err.message });
  }
});

// Send email to specific members
router.post('/send-to-members', auth, async (req, res) => {
  try {
    if (req.user.role !== 'state_admin' && req.user.role !== 'district_admin') {
      return res.status(403).json({ error: 'Access denied' });
    }

    const { memberIds, subject, message } = req.body;

    if (!subject || !message || !memberIds || memberIds.length === 0) {
      return res.status(400).json({ error: 'Subject, message, and member IDs are required' });
    }

    const members = await Member.find({ _id: { $in: memberIds } }).populate('district', 'name');

    if (members.length === 0) {
      return res.status(404).json({ error: 'No members found' });
    }

    const transporter = createTransporter();
    if (!transporter) {
      return res.status(500).json({ error: 'Email service not configured' });
    }

    let successCount = 0;
    let failCount = 0;

    for (const member of members) {
      try {
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: member.email,
          subject: subject,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
              <h2 style="color: #C53030; text-align: center;">AKHIL GUJARAT AGNIVEER SANGATHAN</h2>
              <h3 style="color: #333;">${subject}</h3>
              
              <p>Dear <strong>${member.fullName}</strong>,</p>
              
              <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                ${message.replace(/\n/g, '<br>')}
              </div>
              
              <div style="margin-top: 20px; padding: 15px; background-color: #e0f2fe; border-radius: 8px;">
                <p style="margin: 0; font-size: 14px;"><strong>Your Details:</strong></p>
                <p style="margin: 5px 0;">Member ID: ${member.memberId}</p>
                <p style="margin: 5px 0;">District: ${member.district?.name || 'N/A'}</p>
              </div>
              
              <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
              
              <p style="font-size: 12px; color: #666; text-align: center;">
                This is an official communication from Akhil Gujarat Agniveer Sangathan.<br>
                For any queries, please contact your district admin.
              </p>
              
              <p style="text-align: center; color: #C53030; font-weight: bold; margin-top: 20px;">
                AKHIL GUJARAT AGNIVEER SANGATHAN
              </p>
            </div>
          `
        };

        await transporter.sendMail(mailOptions);
        successCount++;
      } catch (error) {
        console.error(`Failed to send email to ${member.email}:`, error);
        failCount++;
      }
    }

    res.json({
      success: true,
      message: `Emails sent successfully to ${successCount} members. Failed: ${failCount}`,
      successCount,
      failCount
    });

  } catch (err) {
    console.error('Error sending emails:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
