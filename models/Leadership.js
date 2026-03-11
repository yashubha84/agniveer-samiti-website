const mongoose = require('mongoose');

const leadershipSchema = new mongoose.Schema({
  position: {
    type: String,
    required: true,
    enum: ['president', 'vice-president'],
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  photo: {
    type: String, // URL or path to photo
    default: null
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Leadership', leadershipSchema);