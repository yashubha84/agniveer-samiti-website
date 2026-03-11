const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

const districtSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'district_admin' },
  president: {
    name: String,
    phone: String,
    email: String
  },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

const District = mongoose.model('District', districtSchema);

const sampleDistricts = [
  { name: 'Rajkot', username: 'rajkot_admin', password: 'rajkot123' },
  { name: 'Ahmedabad', username: 'ahmedabad_admin', password: 'ahmedabad123' },
  { name: 'Surat', username: 'surat_admin', password: 'surat123' },
  { name: 'Vadodara', username: 'vadodara_admin', password: 'vadodara123' }
];

const seedDistricts = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/samiti_db');
    console.log('MongoDB Connected');

    for (const districtData of sampleDistricts) {
      const existing = await District.findOne({ name: districtData.name });
      if (!existing) {
        const hashedPassword = await bcrypt.hash(districtData.password, 10);
        const district = new District({
          name: districtData.name,
          username: districtData.username,
          password: hashedPassword
        });
        await district.save();
        console.log(`Created district: ${districtData.name}`);
      } else {
        console.log(`District ${districtData.name} already exists`);
      }
    }

    console.log('District seeding completed!');
    process.exit(0);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
};

seedDistricts();
