const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');
const { auth, isDistrictAdmin } = require('../middleware/auth');

// Submit feedback (public)
router.post('/', async (req, res) => {
  try {
    const feedback = new Feedback(req.body);
    await feedback.save();
    res.status(201).json({ msg: 'Feedback submitted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get feedback for district (district admin)
router.get('/district', auth, isDistrictAdmin, async (req, res) => {
  try {
    const feedback = await Feedback.find({ district: req.user.districtId })
      .sort({ createdAt: -1 });
    res.json(feedback);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all feedback (state admin)
router.get('/all', auth, async (req, res) => {
  try {
    const feedback = await Feedback.find()
      .populate('district', 'name')
      .sort({ createdAt: -1 });
    res.json(feedback);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Respond to feedback
router.put('/:id/respond', auth, isDistrictAdmin, async (req, res) => {
  try {
    const { response, status } = req.body;
    const feedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      {
        response,
        status,
        respondedBy: req.user.id,
        respondedAt: new Date()
      },
      { new: true }
    );
    res.json(feedback);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
