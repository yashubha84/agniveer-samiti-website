const mongoose = require('mongoose');
require('dotenv').config();

const testConnection = async () => {
  try {
    console.log('Testing MongoDB connection...');
    
    const mongoURI = process.env.MONGODB_URI;
    console.log('MongoDB URI exists:', !!mongoURI);
    
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('✅ MongoDB Connected Successfully!');
    
    // Test collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Available collections:', collections.map(c => c.name));
    
    mongoose.connection.close();
  } catch (err) {
    console.error('❌ MongoDB Connection Error:', err.message);
  }
};

testConnection();