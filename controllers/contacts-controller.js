const { ContactsModel } = require('../models');
const decorators = require('../decorators');
const { HttpError } = require('../helpers');

const listContacts = async (_, res) => {
  const result = await ContactsModel.find({});
  res.status(200).json({
    status: 'success',
    code: 200,
    data: {
      contact: result,
    },
  });
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await ContactsModel.findById(contactId);

  if (!result) {
    throw HttpError(404, 'Not found');
  }

  res.status(200).json({
    status: 'success',
    code: 200,
    data: {
      contact: result,
    },
  });
};

const addNewContact = async (req, res) => {
  const result = await ContactsModel.create({ ...req.body });
  res.status(201).json({
    status: 'created',
    code: 201,
    data: {
      contact: result,
    },
  });
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await ContactsModel.findByIdAndDelete(contactId);

  if (!result) {
    throw HttpError(404, 'Not found');
  }

  res.status(200).json({
    status: 'deleted',
    code: 200,
  });
};

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const result = await ContactsModel.findByIdAndUpdate(contactId, req.body, { new: true });

  if (!result) {
    throw HttpError(404, 'Not found');
  }

  res.status(200).json({
    status: 'success',
    code: 200,
    data: {
      contact: result,
    },
  });
};

const updateFavorite = async (req, res) => {
  const { contactId } = req.params;
  const result = await ContactsModel.findByIdAndUpdate(contactId, req.body, { new: true });

  if (!result) {
    throw HttpError(404, 'Not found');
  }

  res.status(200).json({
    status: 'success',
    code: 200,
    data: {
      contact: result,
    },
  });
};

module.exports = {
  listContacts: decorators.ctrlWrapper(listContacts),
  getById: decorators.ctrlWrapper(getById),
  addNewContact: decorators.ctrlWrapper(addNewContact),
  removeContact: decorators.ctrlWrapper(removeContact),
  updateById: decorators.ctrlWrapper(updateById),
  updateFavorite: decorators.ctrlWrapper(updateFavorite),
};
