const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const memberSchema = new mongoose.Schema({
  memberId: { type: String, unique: true },
  fullName: { type: String, required: true },
  armyNumber: { type: String, required: true, unique: true },
  district: { type: mongoose.Schema.Types.ObjectId, ref: 'District', required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  occupation: String,
  photo: String,
  password: { type: String, required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'District' },
  approvedAt: Date,
  createdAt: { type: Date, default: Date.now }
});

memberSchema.pre('save', async function(next) {
  // Hash password if it's modified
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }

  if (!this.memberId) {
    // Get district info to generate unique ID
    const District = mongoose.model('District');
    const district = await District.findById(this.district);
    
    // Count members in this district
    const districtMemberCount = await mongoose.model('Member').countDocuments({ district: this.district });
    
    // Format: 24 (Gujarat state code) + District code (2 digits) + Member number (5 digits)
    // Example: 24-01-00001 for first member of first district
    const districtCode = district.districtCode || '00';
    const memberNumber = String(districtMemberCount + 1).padStart(5, '0');
    this.memberId = `AGAS${districtCode}${memberNumber}`;
  }
  next();
});

module.exports = mongoose.model('Member', memberSchema);
