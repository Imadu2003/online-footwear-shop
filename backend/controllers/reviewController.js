const Review = require('../models/Review');

// @desc    Get all customer reviews
// @route   GET /api/reviews
// @access  Public
const getReviews = async (req, res) => {
    try {
        const reviews = await Review.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            data: reviews
        });
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({ message: 'Server Error: Unable to fetch reviews.' });
    }
};

// @desc    Post a new review
// @route   POST /api/reviews
// @access  Public
const createReview = async (req, res) => {
    try {
        const { name, rating, comment } = req.body;

        if (!name || !rating || !comment) {
            return res.status(400).json({ message: 'Name, rating, and comment are required.' });
        }

        const newReview = await Review.create({
            name,
            rating: Number(rating),
            comment,
            verified: true
        });

        res.status(201).json({
            success: true,
            message: 'Review posted successfully',
            data: newReview
        });
    } catch (error) {
        console.error('Error creating review:', error);
        res.status(500).json({ message: 'Server Error: Unable to save review.' });
    }
};

module.exports = {
    getReviews,
    createReview
};
