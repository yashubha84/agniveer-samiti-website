const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  district: { type: mongoose.Schema.Types.ObjectId, ref: 'District', required: true },
  userName: { type: String, required: true },
  userEmail: { type: String, required: true },
  userPhone: String,
  rating: { type: Number, min: 1, max: 5, required: true },
  message: { type: String, required: true },
  status: { type: String, enum: ['pending', 'reviewed', 'resolved'], default: 'pending' },
  response: String,
  respondedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'District' },
  respondedAt: Date,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Feedback', feedbackSchema);
