const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// Register a new user
const registerUser = async (req, res) => {
    try {

        const { name, email, password } = req.body;

        // Check if user already exists
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);


        //the new user save into database
        const user = new User({
            name,
            email,
            password :hashedPassword
        });

        await user.save();
        res.status(201).json({message : "User registered successfully"});

    } catch(error){
        console.error(error);
        res.status(500).json({message : "Server error"});
    }
};

// Login user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Check if user exists
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({message : 'Invalis email or password'});
        }

        // Check if password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({message : 'Invalid email or password'});
        }

        // Create and sign a JWT token
        const token = jwt.sign({userId :user._id,role: user.role}, process.env.JWT_SECRET || 'supersecretkey123', {expiresIn: '1h'}); //this token    available for 1 hour, after that user need to login again
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({message : "Server error"});
    }
};

const updateUserProfile = async (req, res) => {
    try {
  const userId = req.params.id;  // Get the user ID from the request parameters
  const { name, phone, address, profileImage } = req.body;  // Get the updated user data from the request body

  // Find the user by ID and update their profile

   const updatedUser = await User.findByIdAndUpdate(
            userId,
            { name, phone, address, profileImage },
            { new: true }
             ).select('-password');   // Exclude the password field from the returned user object


            
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(updatedUser); 


         } catch (error) {
        console.error("Profile Update Error:", error);
        res.status(500).json({ message: 'Server error while updating profile' });
    }
};

 const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password').sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: users });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

 const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json({ success: true, message: 'User deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Reset user password by email
const resetPassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body;
        if (!email || !newPassword) {
            return res.status(400).json({ success: false, message: 'Email and new password are required' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: 'No user account found with this email address' });
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        await user.save();

        res.status(200).json({ success: true, message: 'Password reset successfully! You can now log in with your new password.' });
    } catch (error) {
        console.error('Password reset error:', error);
        res.status(500).json({ success: false, message: 'Server error while resetting password' });
    }
};

module.exports = {
    registerUser,
    loginUser,
    updateUserProfile,
    getAllUsers,
    deleteUser,
    resetPassword
};