const contacts = require('../models');
const { HttpError } = require('../helpers');
const schema = require('../schemas');

const listContacts = async (_, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);

    if (!result) {
      throw HttpError(404, 'Not found');
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

const addNewContact = async (req, res, next) => {
  try {
    const { error } = schema.schemaContact.validate(req.body);
    if (error) {
      throw HttpError(400, 'missing required name field');
    }

    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);

    if (!result) {
      throw HttpError(404, 'Not found');
    }

    res.json({ message: 'contact deleted' });
  } catch (error) {
    next(error);
  }
};

const updateById = async (req, res, next) => {
  try {
    const { error } = schema.schemaContact.validate(req.body);
    if (error) {
      throw HttpError(400, 'missing fields');
    }

    const { contactId } = req.params;
    const result = await contacts.updateContact(contactId, req.body);

    if (!result) {
      throw HttpError(404, 'Not found');
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = { listContacts, getById, removeContact, addNewContact, updateById };
