const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const { auth, isDistrictAdmin } = require('../middleware/auth');

// Get all events (public)
router.get('/', async (req, res) => {
  try {
    const events = await Event.find().populate('district', 'name').sort({ date: -1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create event (both state admin and district admin)
router.post('/', auth, async (req, res) => {
  try {
    const eventData = {
      ...req.body,
      createdBy: req.user.id
    };

    // If district admin, force their district
    if (req.user.role === 'district_admin') {
      eventData.district = req.user.districtId;
      eventData.eventType = 'district';
    } else if (req.user.role === 'state_admin') {
      // State admin can create events for any district or state-level
      eventData.district = req.body.district || null;
      eventData.eventType = req.body.eventType || 'state';
    }

    const event = new Event(eventData);
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update event
router.put('/:id', auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    // Check permissions
    if (req.user.role === 'district_admin' && event.district.toString() !== req.user.districtId) {
      return res.status(403).json({ error: 'Not authorized to update this event' });
    }

    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedEvent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete event
router.delete('/:id', auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    // Check permissions
    if (req.user.role === 'district_admin' && event.district.toString() !== req.user.districtId) {
      return res.status(403).json({ error: 'Not authorized to delete this event' });
    }

    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: 'Event deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
