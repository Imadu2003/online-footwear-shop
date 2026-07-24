const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

dotenv.config();

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB for Admin Seeding...");

        // Check if admin already exists
        const existingAdmin = await User.findOne({ email: 'admin@shoe.com' });
        if (existingAdmin) {
            console.log("Admin user already exists!");
            process.exit(0);
        }

        // Hash the password 'admin123'
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('admin123', salt);

        // Create the admin user
        const adminUser = new User({
            name: 'Store Admin',
            email: 'admin@shoe.com',
            password: hashedPassword,
            phone: '0710000000',
            role: 'admin' // This is the crucial part that grants admin access
        });

        await adminUser.save();
        console.log("Admin user successfully created! (Email: admin@shoe.com | Password: admin123)");
        process.exit(0);
    } catch (error) {
        console.error("Error seeding admin:", error);
        process.exit(1);
    }
};

seedAdmin();
