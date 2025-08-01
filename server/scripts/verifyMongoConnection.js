// To run this script, use:
// node server/scripts/verifyMongoConnection.js
require('dotenv').config({ path: '.env' });
const mongoose = require('mongoose');

const verifyConnection = async () => {
  try {
    console.log('Verifying MongoDB connection...');
    
    // Debug: Log the current working directory and environment variables
    console.log('Current directory:', process.cwd());
    console.log('Environment variables:', {
      NODE_ENV: process.env.NODE_ENV,
      MONGODB_URI: process.env.MONGODB_URI ? '*** URI is set ***' : 'MONGODB_URI is not set',
      MONGO_URI: process.env.MONGO_URI ? '*** URI is set ***' : 'MONGO_URI is not set'
    });
    
    // Get MongoDB URI from environment variables
    const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;
    
    if (!mongoUri) {
      throw new Error('MongoDB connection string not found in environment variables. Please check your .env file.');
    }

    console.log('Connecting to MongoDB...');
    
    // Connect to MongoDB with connection options
    const conn = await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    });

    console.log('✅ MongoDB Connected Successfully!');
    console.log(`MongoDB Host: ${conn.connection.host}`);
    console.log(`MongoDB Database: ${conn.connection.name}`);

    // Check if User model exists and can be queried
    try {
      const User = require('../models/User');
      const adminUser = await User.findOne({ email: 'ayushmanmishraji02@gmail.com' });
      
      if (adminUser) {
        console.log('\n✅ Admin User Found:');
        console.log('==================');
        console.log(`Name: ${adminUser.name || 'Not set'}`);
        console.log(`Email: ${adminUser.email}`);
        console.log(`Role: ${adminUser.role || 'user'}`);
        console.log(`Verified: ${adminUser.isVerified ? 'Yes' : 'No'}`);
      } else {
        console.log('\nℹ️  Admin user not found. Run setupAdmin.js to create one.');
      }
    } catch (err) {
      console.warn('\n⚠️  Could not check admin user:', err.message);
    }

    // Show database stats
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    console.log('\n📊 Database Collections:');
    console.log('=====================');
    collections.forEach((collection, index) => {
      console.log(`${index + 1}. ${collection.name}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error connecting to MongoDB:', error.message);
    
    // More detailed error information
    if (error.name === 'MongooseServerSelectionError') {
      console.error('\nThis usually means:');
      console.error('1. The MongoDB server is not running');
      console.error('2. The connection string is incorrect');
      console.error('3. There are network connectivity issues');
      console.error('4. The IP is not whitelisted in MongoDB Atlas (if using Atlas)');
    }
    
    console.error('\nPlease check:');
    console.error('1. Is MongoDB running?');
    console.error('2. Is the connection string in .env correct?');
    console.error('3. If using Atlas, is your IP whitelisted?');
    
    process.exit(1);
  }
};

verifyConnection();
