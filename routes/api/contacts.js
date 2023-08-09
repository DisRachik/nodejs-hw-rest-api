const express = require('express');
const routerContacts = express.Router();
const { validateInputContact } = require('../../decorators');
const { schemaContact, schemaUpdateFavoriteForContact } = require('../../schemas');
const { isValidId, authenticate } = require('../../middlewares');
const {
  listContacts,
  addNewContact,
  getById,
  removeContact,
  updateById,
  updateFavorite,
} = require('../../controllers/contacts');

routerContacts.use(authenticate);

// Give data for front
routerContacts.get('/', listContacts);

// Give data about 1 contact by id
routerContacts.get('/:contactId', isValidId, getById);

// Add a new contact to base data
routerContacts.post('/', validateInputContact(schemaContact), addNewContact);

// Delete contacts from base data by id
routerContacts.delete('/:contactId', isValidId, removeContact);

// Update contact data by id
routerContacts.put('/:contactId', validateInputContact(schemaContact), isValidId, updateFavorite);

// Update contact data by id
routerContacts.patch(
  '/:contactId/favorite',
  validateInputContact(schemaUpdateFavoriteForContact),
  isValidId,
  updateById
);

module.exports = routerContacts;
