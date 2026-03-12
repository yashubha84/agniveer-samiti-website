const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  district: { type: mongoose.Schema.Types.ObjectId, ref: 'District' },
  eventType: { type: String, enum: ['state', 'district'], default: 'district' },
  date: { type: Date, required: true },
  location: String,
  photos: [String],
  volunteers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Volunteer' }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'District' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Event', eventSchema);
