require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const createAdminUser = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected...');

    // Admin user details
    const adminData = {
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'admin123', // In production, use a more secure password
      role: 'admin',
    };

    // Check if admin already exists
    let admin = await User.findOne({ email: adminData.email });

    if (admin) {
      // Update existing user to admin if not already
      if (admin.role !== 'admin') {
        admin.role = 'admin';
        await admin.save();
        console.log('Existing user updated to admin');
      } else {
        console.log('Admin user already exists');
      }
    } else {
      // Create new admin user
      const salt = await bcrypt.genSalt(10);
      adminData.password = await bcrypt.hash(adminData.password, salt);
      
      admin = new User(adminData);
      await admin.save();
      console.log('Admin user created successfully');
    }

    console.log('Admin setup completed');
    process.exit(0);
  } catch (error) {
    console.error('Error setting up admin user:', error.message);
    process.exit(1);
  }
};

createAdminUser();
