const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema({
  volunteerId: { type: String, unique: true },
  name: { type: String, required: true },
  district: { type: mongoose.Schema.Types.ObjectId, ref: 'District', required: true },
  phone: { type: String, required: true },
  email: String,
  skills: [String],
  availability: { type: String, enum: ['weekdays', 'weekends', 'both'], default: 'both' },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  eventsParticipated: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
  createdAt: { type: Date, default: Date.now }
});

volunteerSchema.pre('save', async function(next) {
  if (!this.volunteerId) {
    // Get district info to generate unique ID
    const District = mongoose.model('District');
    const district = await District.findById(this.district);
    
    // Count volunteers in this district
    const districtVolunteerCount = await mongoose.model('Volunteer').countDocuments({ district: this.district });
    
    // Format: 24 (Gujarat state code) + District code (2 digits) + V + Volunteer number (4 digits)
    // Example: 24-01-V-0001 for first volunteer of first district
    const districtCode = district.districtCode || '00';
    const volunteerNumber = String(districtVolunteerCount + 1).padStart(4, '0');
    this.volunteerId = `24${districtCode}V${volunteerNumber}`;
  }
  next();
});

module.exports = mongoose.model('Volunteer', volunteerSchema);
