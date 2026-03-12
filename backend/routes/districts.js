const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const District = require('../models/District');
const { auth, isStateAdmin } = require('../middleware/auth');

// Get all districts (public)
router.get('/', async (req, res) => {
  try {
    const districts = await District.find({ isActive: true }).select('-password');
    res.json(districts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single district
router.get('/:id', async (req, res) => {
  try {
    const district = await District.findById(req.params.id).select('-password');
    res.json(district);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create district (state admin only)
router.post('/', auth, isStateAdmin, async (req, res) => {
  try {
    const { name, districtCode, username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const district = new District({
      name,
      districtCode,
      username,
      password: hashedPassword,
      isApprovedByState: false
    });
    
    await district.save();
    res.status(201).json({ msg: 'District created successfully. Awaiting approval.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Approve district (state admin only)
router.put('/:id/approve', auth, isStateAdmin, async (req, res) => {
  try {
    const { isApprovedByState } = req.body;
    const district = await District.findByIdAndUpdate(
      req.params.id,
      { isApprovedByState },
      { new: true }
    ).select('-password');
    
    res.json(district);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Assign president/vice president (state admin only)
router.put('/:id/assign-leadership', auth, isStateAdmin, async (req, res) => {
  try {
    const { president, vicePresident } = req.body;
    const district = await District.findByIdAndUpdate(
      req.params.id,
      { 
        $set: { 
          president: president || undefined,
          vicePresident: vicePresident || undefined
        }
      },
      { new: true }
    ).select('-password');
    
    res.json(district);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update district committee
router.put('/:id/committee', auth, async (req, res) => {
  try {
    const district = await District.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    ).select('-password');
    
    res.json(district);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
