const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const District = require('../models/District');
const Member = require('../models/Member');

// State Admin Login
router.post('/admin/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ token, user: { id: admin._id, username: admin.username, role: admin.role } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// District Login
router.post('/district/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const district = await District.findOne({ username, isActive: true });
    if (!district) return res.status(400).json({ msg: 'Invalid credentials' });

    // Check if approved by state admin
    if (!district.isApprovedByState) {
      return res.status(403).json({ msg: 'Your account is pending approval from State Admin' });
    }

    const isMatch = await bcrypt.compare(password, district.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = jwt.sign(
      { id: district._id, role: district.role, districtId: district._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ token, user: { id: district._id, name: district.name, role: district.role } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Member Login
router.post('/member/login', async (req, res) => {
  try {
    const { armyNumber, password } = req.body;
    
    // Find member by army number
    const member = await Member.findOne({ armyNumber }).populate('district', 'name');
    if (!member) {
      return res.status(400).json({ msg: 'Invalid army number or password' });
    }

    // Check if member is approved
    if (member.status !== 'approved') {
      return res.status(403).json({ msg: 'Your membership is pending approval from District Admin' });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, member.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid army number or password' });
    }

    const token = jwt.sign(
      { id: member._id, role: 'member', districtId: member.district._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ 
      token, 
      user: { 
        id: member._id, 
        memberId: member.memberId,
        name: member.fullName, 
        role: 'member',
        district: member.district.name
      } 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
