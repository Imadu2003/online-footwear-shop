const express = require('express');
const router = express.Router();
const { createContact, getContacts,updateContact } = require('../controllers/contactController');

router.post('/', createContact);
router.get('/', getContacts);
router.put('/:id', updateContact);

module.exports = router;
