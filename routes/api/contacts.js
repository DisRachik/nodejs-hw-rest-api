const express = require('express');
const router = express.Router();
const contacts = require('../../models/contacts');
const { HttpError } = require('../../helpers');

// Give data for front
router.get('/', async (_, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

// Give data about 1 contact by id
router.get('/:contactId', async (req, res, next) => {
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
});

// Add a new contact to base data
router.post('/', async (req, res, next) => {
  try {
    const result = await contacts.addContact(req.body);
    console.log(result);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

// Delete contacts from base data by id
router.delete('/:contactId', async (req, res, next) => {
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
});

// Change contact data by id
router.put('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.updateContact(contactId, req.body);

    if (!result) {
      throw HttpError(404, 'Not foundssss');
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
