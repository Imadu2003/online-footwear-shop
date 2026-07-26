const  express = require('express');
const router = express.Router();

// Import the controller functions what we created in the authController.js file ( registerUser, loginUser, getUserProfile )
const {registerUser,loginUser,updateUserProfile,getAllUsers,deleteUser,resetPassword} = require('../controllers/authController');

//register path of the user
router.post('/register',registerUser);
//login path of the user
router.post('/login',loginUser);
router.post('/reset-password', resetPassword);
router.put('/profile/:id',updateUserProfile);
router.get('/users', getAllUsers);
router.delete('/users/:id', deleteUser);

module.exports = router;