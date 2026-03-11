const express = require('express');
const router = express.Router();
const Volunteer = require('../models/Volunteer');
const { auth } = require('../middleware/auth');

// Register volunteer (public)
router.post('/register', async (req, res) => {
  try {
    const volunteer = new Volunteer(req.body);
    await volunteer.save();
    res.status(201).json({ msg: 'Volunteer registration successful', volunteerId: volunteer.volunteerId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get volunteers
router.get('/', auth, async (req, res) => {
  try {
    const query = req.user.role === 'district_admin' 
      ? { district: req.user.districtId }
      : {};
    const volunteers = await Volunteer.find(query).populate('district', 'name');
    res.json(volunteers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get volunteers by district (public)
router.get('/district/:districtId', async (req, res) => {
  try {
    const volunteers = await Volunteer.find({ district: req.params.districtId, status: 'active' });
    res.json(volunteers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
