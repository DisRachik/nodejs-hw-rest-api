const express = require('express');
const routerContacts = express.Router();
const { contactsController } = require('../../controllers');
const { validateInputContact } = require('../../decorators');
const { schemaContact, schemaUpdateFavoriteForContact } = require('../../schemas');
const { isValidId, authenticate } = require('../../middlewares');

routerContacts.use(authenticate);

// Give data for front
routerContacts.get('/', contactsController.listContacts);

// Give data about 1 contact by id
routerContacts.get('/:contactId', isValidId, contactsController.getById);

// Add a new contact to base data
routerContacts.post('/', validateInputContact(schemaContact), contactsController.addNewContact);

// Delete contacts from base data by id
routerContacts.delete('/:contactId', isValidId, contactsController.removeContact);

// Update contact data by id
routerContacts.put(
  '/:contactId',
  validateInputContact(schemaContact),
  isValidId,
  contactsController.updateFavorite
);

// Update contact data by id
routerContacts.patch(
  '/:contactId/favorite',
  validateInputContact(schemaUpdateFavoriteForContact),
  isValidId,
  contactsController.updateById
);

module.exports = routerContacts;
