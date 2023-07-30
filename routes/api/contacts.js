const express = require('express');
const router = express.Router();
const { contactsController } = require('../../controllers');
const { validateInputContact } = require('../../decorators');
const { schemaContact, schemaUpdateFavoriteForContact } = require('../../schemas');
const { isValidId } = require('../../middlewares');

// Give data for front
router.get('/', contactsController.listContacts);

// Give data about 1 contact by id
router.get('/:contactId', isValidId, contactsController.getById);

// Add a new contact to base data
router.post('/', validateInputContact(schemaContact), contactsController.addNewContact);

// Delete contacts from base data by id
router.delete('/:contactId', isValidId, contactsController.removeContact);

// Update contact data by id
router.put(
  '/:contactId',
  validateInputContact(schemaContact),
  isValidId,
  contactsController.updateFavorite
);

// Update contact data by id
router.patch(
  '/:contactId/favorite',
  validateInputContact(schemaUpdateFavoriteForContact),
  isValidId,
  contactsController.updateById
);

module.exports = router;
