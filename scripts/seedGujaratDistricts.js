const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

const districtSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  districtCode: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'district_admin' },
  isApprovedByState: { type: Boolean, default: false },
  president: {
    name: String,
    phone: String,
    email: String
  },
  vicePresident: {
    name: String,
    phone: String,
    email: String
  },
  secretary: {
    name: String,
    phone: String,
    email: String
  },
  treasurer: {
    name: String,
    phone: String,
    email: String
  },
  committeeMembers: [{
    name: String,
    position: String,
    phone: String,
    email: String
  }],
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

const District = mongoose.model('District', districtSchema);

// All 33 districts of Gujarat with unique codes
const gujaratDistricts = [
  { name: 'Ahmedabad', code: '01' },
  { name: 'Amreli', code: '02' },
  { name: 'Anand', code: '03' },
  { name: 'Aravalli', code: '04' },
  { name: 'Banaskantha', code: '05' },
  { name: 'Bharuch', code: '06' },
  { name: 'Bhavnagar', code: '07' },
  { name: 'Botad', code: '08' },
  { name: 'Chhota Udaipur', code: '09' },
  { name: 'Dahod', code: '10' },
  { name: 'Dang', code: '11' },
  { name: 'Devbhoomi Dwarka', code: '12' },
  { name: 'Gandhinagar', code: '13' },
  { name: 'Gir Somnath', code: '14' },
  { name: 'Jamnagar', code: '15' },
  { name: 'Junagadh', code: '16' },
  { name: 'Kheda', code: '17' },
  { name: 'Kutch', code: '18' },
  { name: 'Mahisagar', code: '19' },
  { name: 'Mehsana', code: '20' },
  { name: 'Morbi', code: '21' },
  { name: 'Narmada', code: '22' },
  { name: 'Navsari', code: '23' },
  { name: 'Panchmahal', code: '24' },
  { name: 'Patan', code: '25' },
  { name: 'Porbandar', code: '26' },
  { name: 'Rajkot', code: '27' },
  { name: 'Sabarkantha', code: '28' },
  { name: 'Surat', code: '29' },
  { name: 'Surendranagar', code: '30' },
  { name: 'Tapi', code: '31' },
  { name: 'Vadodara', code: '32' },
  { name: 'Valsad', code: '33' }
];

const seedGujaratDistricts = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/samiti_db');
    console.log('MongoDB Connected');

    for (const district of gujaratDistricts) {
      const existing = await District.findOne({ name: district.name });
      if (!existing) {
        const username = district.name.toLowerCase().replace(/\s+/g, '_') + '_admin';
        const password = district.name.toLowerCase().replace(/\s+/g, '') + '123';
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newDistrict = new District({
          name: district.name,
          districtCode: district.code,
          username: username,
          password: hashedPassword,
          isApprovedByState: false
        });
        
        await newDistrict.save();
        console.log(`✓ Created: ${district.name} (Code: ${district.code}, Username: ${username}, Password: ${password})`);
      } else {
        console.log(`- ${district.name} already exists`);
      }
    }

    console.log('\n✅ All Gujarat districts seeded successfully!');
    console.log('\nNote: District admins need State Admin approval before they can login.');
    process.exit(0);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
};

seedGujaratDistricts();
