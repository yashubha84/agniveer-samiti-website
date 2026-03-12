const mongoose = require('mongoose');
const Leadership = require('../models/Leadership');
require('dotenv').config();

const seedLeadership = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/samiti_db');
    console.log('MongoDB Connected');

    // Clear existing leadership data
    await Leadership.deleteMany({});

    // Create leadership data
    const leadershipData = [
      {
        position: 'president',
        name: 'UDAYSINH V GOHIL',
        photo: '/president.jpg',
        isActive: true
      },
      {
        position: 'vice-president',
        name: 'SACHIN GURJAR',
        photo: '/vice-president.jpg',
        isActive: true
      }
    ];

    await Leadership.insertMany(leadershipData);
    console.log('Leadership data seeded successfully');

    mongoose.connection.close();
  } catch (err) {
    console.error('Error seeding leadership data:', err);
    process.exit(1);
  }
};

seedLeadership();