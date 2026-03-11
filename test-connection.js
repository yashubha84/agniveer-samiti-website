const mongoose = require('mongoose');
require('dotenv').config();

console.log('Testing MongoDB Connection...\n');
console.log('Connection String:', process.env.MONGODB_URI?.replace(/\/\/([^:]+):([^@]+)@/, '//$1:****@') || 'Not found in .env');
console.log('');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/samiti_db')
  .then(() => {
    console.log('✅ MongoDB Connected Successfully!');
    console.log('Database:', mongoose.connection.name);
    console.log('Host:', mongoose.connection.host);
    console.log('Port:', mongoose.connection.port);
    console.log('');
    console.log('You can now run:');
    console.log('  node scripts/createAdmin.js');
    console.log('  node scripts/seedGujaratDistricts.js');
    console.log('');
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ MongoDB Connection Failed!');
    console.error('Error:', err.message);
    console.error('');
    console.error('Troubleshooting:');
    console.error('1. Check if MongoDB is running (local installation)');
    console.error('2. Verify connection string in .env file');
    console.error('3. Check network/firewall settings');
    console.error('4. For Atlas: Verify IP whitelist and credentials');
    console.error('');
    console.error('See MONGODB_SETUP.md for detailed instructions');
    console.error('');
    process.exit(1);
  });
