const express = require('express');
const router = express.Router();
const controller = require('../../controllers');
const { validateInputContact } = require('../../decorators');
const { schemaContact } = require('../../schemas');

// Give data for front
router.get('/', controller.listContacts);

// Give data about 1 contact by id
router.get('/:contactId', controller.getById);

// Add a new contact to base data
router.post('/', validateInputContact(schemaContact), controller.addNewContact);

// Delete contacts from base data by id
router.delete('/:contactId', controller.removeContact);

// Update contact data by id
router.put('/:contactId', validateInputContact(schemaContact), controller.updateById);

module.exports = router;
