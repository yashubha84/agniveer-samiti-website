const express = require('express');
const router = express.Router();
const Member = require('../models/Member');
const { auth, isDistrictAdmin } = require('../middleware/auth');
const { sendMemberRegistrationEmail, sendApprovalEmail } = require('../utils/emailService');

// Register new member (public)
router.post('/register', async (req, res) => {
  try {
    const member = new Member(req.body);
    await member.save();
    
    // Populate district name for email
    await member.populate('district', 'name');
    
    // Send registration email
    const emailData = {
      memberId: member.memberId,
      fullName: member.fullName,
      armyNumber: member.armyNumber,
      district: member.district.name,
      phone: member.phone,
      email: member.email
    };
    
    // Send email asynchronously (don't wait for it)
    sendMemberRegistrationEmail(emailData).catch(err => {
      console.error('Failed to send registration email:', err);
    });
    
    res.status(201).json({ 
      msg: 'Registration successful. Check your email for details. Awaiting approval.', 
      memberId: member.memberId 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all members
router.get('/', auth, async (req, res) => {
  try {
    const query = req.user.role === 'district_admin' 
      ? { district: req.user.districtId }
      : {};
    const members = await Member.find(query).populate('district', 'name');
    res.json(members);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get member by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const member = await Member.findById(req.params.id).populate('district', 'name');
    if (!member) {
      return res.status(404).json({ error: 'Member not found' });
    }
    res.json(member);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Approve/Reject member
router.put('/:id/status', auth, isDistrictAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    const member = await Member.findByIdAndUpdate(
      req.params.id,
      { 
        status, 
        approvedBy: req.user.id,
        approvedAt: status === 'approved' ? new Date() : null
      },
      { new: true }
    ).populate('district', 'name');
    
    // Send approval email if status is approved
    if (status === 'approved') {
      const emailData = {
        memberId: member.memberId,
        fullName: member.fullName,
        armyNumber: member.armyNumber,
        phone: member.phone,
        email: member.email
      };
      
      // Send email asynchronously
      sendApprovalEmail(emailData).catch(err => {
        console.error('Failed to send approval email:', err);
      });
    }
    
    res.json(member);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
