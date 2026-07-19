const  express = require('express');
const router = express.Router();

// Import the controller functions what we created in the authController.js file ( registerUser, loginUser, getUserProfile )
const {registerUser,loginUser,updateUserProfile} = require('../controllers/authController');

//register path of the user
router.post('/register',registerUser);
//login path of the user
router.post('/login',loginUser);
router.put('/profile/:id',updateUserProfile);

module.exports = router;