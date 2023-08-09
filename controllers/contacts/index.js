const { ctrlWrapper } = require('../../decorators');

const listContacts = require('./listContacts');
const addNewContact = require('./addNewContact');
const getById = require('./getById');
const removeContact = require('./removeContact');
const updateById = require('./updateById');
const updateFavorite = require('./updateFavorite');

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  addNewContact: ctrlWrapper(addNewContact),
  getById: ctrlWrapper(getById),
  removeContact: ctrlWrapper(removeContact),
  updateById: ctrlWrapper(updateById),
  updateFavorite: ctrlWrapper(updateFavorite),
};
