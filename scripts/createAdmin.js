const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: './server/.env' });

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// User model
const User = require('../server/models/User');

const createAdminUser = async () => {
  try {
    const adminEmail = 'admin@example.com';
    const adminPassword = 'admin123'; // Change this to a secure password
    
    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminEmail });
    
    if (existingAdmin) {
      // Update existing admin
      existingAdmin.role = 'admin';
      existingAdmin.password = await bcrypt.hash(adminPassword, 10);
      await existingAdmin.save();
      console.log('Admin user updated successfully!');
    } else {
      // Create new admin
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      
      const adminUser = new User({
        name: 'Admin User',
        email: adminEmail,
        password: hashedPassword,
        role: 'admin'
      });
      
      await adminUser.save();
      console.log('Admin user created successfully!');
    }
    
    console.log('Admin credentials:');
    console.log(`Email: ${adminEmail}`);
    console.log(`Password: ${adminPassword}`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }
};

createAdminUser();
