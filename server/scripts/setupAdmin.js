require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const setupAdmin = async () => {
  try {
    // Connect to MongoDB using MONGODB_URI from .env
    const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error('MongoDB connection string not found in environment variables');
    }

    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected...');

    // Admin user details
    const adminEmail = 'ayushmanmishraji02@gmail.com';
    const adminPassword = 'ayushman02';

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    // Check if admin exists
    let admin = await User.findOne({ email: adminEmail });

    if (admin) {
      // Update existing admin
      admin.role = 'admin';
      admin.password = hashedPassword;
      await admin.save();
      console.log('Existing user updated to admin');
    } else {
      // Create new admin
      admin = new User({
        name: 'Admin User',
        email: adminEmail,
        password: hashedPassword,
        role: 'admin',
        isVerified: true
      });
      await admin.save();
      console.log('Admin user created successfully');
    }

    console.log('\nAdmin Setup Complete!');
    console.log('===================');
    console.log(`Email: ${adminEmail}`);
    console.log(`Password: ${adminPassword}`);
    console.log('\nPlease change this password after first login!\n');

    process.exit(0);
  } catch (error) {
    console.error('Error setting up admin user:', error.message);
    console.error('Stack:', error.stack);
    process.exit(1);
  }
};

setupAdmin();
