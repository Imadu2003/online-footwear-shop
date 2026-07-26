const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true // a email can only be used once for registration
    },
    password: {
        type: String,
        required: true
    },  
    role: {
        type: String,
        default: 'customer' // default role is customer, can be changed to admin manually in the database
    },
    profileImage:{
                type: String,
                default: "https://cdn-icons-png.flaticon.com/512/149/149071.png"

    },
     phone: {
                type: String,
                default: ""
     },
     address: {
                type: String,
                default: ""
     }
    
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;