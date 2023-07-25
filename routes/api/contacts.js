const express = require('express');
const router = express.Router();
const controller = require('../../controllers');
const { validateInputContact } = require('../../decorators');
const { schemaContact } = require('../../schemas');
const { isValidId } = require('../../middlewares');

// Give data for front
router.get('/', controller.listContacts);

// Give data about 1 contact by id
router.get('/:contactId', isValidId, controller.getById);

// Add a new contact to base data
router.post('/', validateInputContact(schemaContact), controller.addNewContact);

// Delete contacts from base data by id
router.delete('/:contactId', isValidId, controller.removeContact);

// Update contact data by id
router.put('/:contactId', validateInputContact(schemaContact), isValidId, controller.updateById);

module.exports = router;
