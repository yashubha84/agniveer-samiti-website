const express = require('express');
const router = express.Router();
const Leadership = require('../models/Leadership');
const { auth } = require('../middleware/auth');

// Get all leadership (public route)
router.get('/', async (req, res) => {
  try {
    const leadership = await Leadership.find({ isActive: true }).sort({ position: 1 });
    res.json(leadership);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get specific leader by position (public route)
router.get('/:position', async (req, res) => {
  try {
    const leader = await Leadership.findOne({ 
      position: req.params.position, 
      isActive: true 
    });
    
    if (!leader) {
      return res.status(404).json({ msg: 'Leader not found' });
    }
    
    res.json(leader);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Create or update leadership (admin only)
router.post('/', auth, async (req, res) => {
  try {
    const { position, name, photo } = req.body;

    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Access denied' });
    }

    let leader = await Leadership.findOne({ position });

    if (leader) {
      // Update existing leader
      leader.name = name;
      if (photo) leader.photo = photo;
      await leader.save();
    } else {
      // Create new leader
      leader = new Leadership({
        position,
        name,
        photo
      });
      await leader.save();
    }

    res.json(leader);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Update leadership (admin only)
router.put('/:id', auth, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Access denied' });
    }

    const { name, photo, isActive } = req.body;
    
    const leader = await Leadership.findById(req.params.id);
    if (!leader) {
      return res.status(404).json({ msg: 'Leader not found' });
    }

    if (name) leader.name = name;
    if (photo !== undefined) leader.photo = photo;
    if (isActive !== undefined) leader.isActive = isActive;

    await leader.save();
    res.json(leader);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;