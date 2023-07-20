const contacts = require('../models');
const decorators = require('../decorators');
const { HttpError } = require('../helpers');

const listContacts = async (_, res) => {
  const result = await contacts.listContacts();
  res.json(result);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.getContactById(contactId);

  if (!result) {
    throw HttpError(404, 'Not found');
  }

  res.json(result);
};

const addNewContact = async (req, res) => {
  const result = await contacts.addContact(req.body);
  res.status(201).json(result);
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.removeContact(contactId);

  if (!result) {
    throw HttpError(404, 'Not found');
  }

  res.json({ message: 'contact deleted' });
};

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.updateContact(contactId, req.body);

  if (!result) {
    throw HttpError(404, 'Not found');
  }

  res.json(result);
};

module.exports = {
  listContacts: decorators.ctrlWrapper(listContacts),
  getById: decorators.ctrlWrapper(getById),
  removeContact: decorators.ctrlWrapper(removeContact),
  addNewContact: decorators.ctrlWrapper(addNewContact),
  updateById: decorators.ctrlWrapper(updateById),
};
