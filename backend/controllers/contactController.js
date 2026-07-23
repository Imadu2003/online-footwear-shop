const Contact = require('../models/Contact');

// @desc    Submit a contact form message
// @route   POST /api/contact
// @access  Public
const createContact = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ message: 'Name, email and message are required.' });
        }

        const newContact = await Contact.create({
            name,
            email,
            subject: subject || '',
            message
        });

        res.status(201).json({
            success: true,
            message: 'Contact message saved successfully',
            data: newContact
        });
    } catch (error) {
        console.error('Error creating contact message:', error);
        res.status(500).json({ message: 'Server Error: Unable to save message.' });
    }
};

// @desc    Get all contact messages (Admin)
// @route   GET /api/contact
// @access  Public (or Admin Protected)
const getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            data: contacts
        });
    } catch (error) {
        console.error('Error fetching contacts:', error);
        res.status(500).json({ message: 'Server Error: Unable to fetch contacts.' });
    }
};

module.exports = {
    createContact,
    getContacts
};
