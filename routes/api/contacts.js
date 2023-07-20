const express = require('express');
const router = express.Router();
const controller = require('../../controllers');

// Give data for front
router.get('/', controller.listContacts);

// Give data about 1 contact by id
router.get('/:contactId', controller.getById);

// Add a new contact to base data
router.post('/', controller.addNewContact);

// Delete contacts from base data by id
router.delete('/:contactId', controller.removeContact);

// Update contact data by id
router.put('/:contactId', controller.updateById);

module.exports = router;
