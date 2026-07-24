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

//admin can reply and status change
const updateContact = async (req, res) => {
    try {
        const { status, replyMessage } = req.body;
        const contact = await Contact.findById(req.params.id);
        if (!contact) return res.status(404).json({ message: 'Contact not found' });
        if (status) contact.status = status;
        if (replyMessage) {
            contact.replyMessage = replyMessage;
            contact.status = 'replied'; //affer reply the status changed to replied
        }
        const updatedContact = await contact.save();
        res.status(200).json({ success: true, data: updatedContact });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};


module.exports = {
    createContact,
    getContacts,
    updateContact  
};
