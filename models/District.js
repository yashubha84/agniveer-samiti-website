const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const districtSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  districtCode: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String }, // District contact email
  phone: { type: String }, // District contact phone
  address: { type: String }, // District office address
  website: { type: String }, // District website
  role: { type: String, default: 'district_admin' },
  isApprovedByState: { type: Boolean, default: false },
  president: {
    name: String,
    phone: String,
    email: String,
    photo: String
  },
  vicePresident: {
    name: String,
    phone: String,
    email: String,
    photo: String
  },
  secretary: {
    name: String,
    phone: String,
    email: String,
    photo: String
  },
  treasurer: {
    name: String,
    phone: String,
    email: String,
    photo: String
  },
  committeeMembers: [{
    name: String,
    position: String,
    phone: String,
    email: String,
    photo: String
  }],
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

// Hash password before saving
districtSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

module.exports = mongoose.model('District', districtSchema);
