const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db'); // 1. Meka aluthen ekathu karanna

const app = express();

// 2. Database ekata connect wenna meka call karanna
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Basic Route eka
app.get('/', (req, res) => {
    res.send("Hello from Backend!");
});

// Server eka run kirima
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});