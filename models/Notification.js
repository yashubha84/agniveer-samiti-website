const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  type: { type: String, enum: ['state', 'district', 'event'], required: true },
  district: { type: mongoose.Schema.Types.ObjectId, ref: 'District' },
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  isActive: { type: Boolean, default: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'District' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Notification', notificationSchema);
