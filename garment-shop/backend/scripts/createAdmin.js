const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

const createAdmin = async () => {
  try {
    // Connect to MongoDB
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✓ MongoDB connected successfully');

    // Admin details
    const adminData = {
      name: 'Admin User',
      email: 'admin@garmentshop.com',
      password: 'AdminPassword123',
      isAdmin: true
    };

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminData.email });
    if (existingAdmin) {
      console.log('⚠ Admin user already exists with email: ' + adminData.email);
      console.log('\nIf you want to create a different admin, please:');
      console.log('1. Open this file: backend/scripts/createAdmin.js');
      console.log('2. Change the email and/or name');
      console.log('3. Run again');
      process.exit(0);
    }

    // Create new admin user
    const admin = await User.create(adminData);
    console.log('\n✓ Admin user created successfully!\n');
    console.log('Admin Credentials:');
    console.log('─'.repeat(40));
    console.log('Email:    ' + admin.email);
    console.log('Password: ' + 'AdminPassword123');
    console.log('─'.repeat(40));
    console.log('\n⚠️  IMPORTANT SECURITY NOTES:');
    console.log('1. Change this password after your first login!');
    console.log('2. Keep these credentials safe and secure');
    console.log('3. Do not share with unauthorized users\n');
    console.log('Next steps:');
    console.log('1. Start backend: npm run dev');
    console.log('2. Start frontend: npm run dev');
    console.log('3. Go to http://localhost:5173');
    console.log('4. Click "Login" and use the credentials above');
    console.log('5. After login, you\'ll see "Admin" link in navbar');
    console.log('6. Click "Admin" to access the product management dashboard\n');

    await mongoose.disconnect();
    console.log('✓ Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin:', error.message);
    if (error.message.includes('MONGODB_URI')) {
      console.log('\n⚠️  Make sure MONGODB_URI is set in your .env file');
    }
    process.exit(1);
  }
};

createAdmin();
