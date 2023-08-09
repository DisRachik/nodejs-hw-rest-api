const { ContactsModel } = require('../../models');

const addNewContact = async (req, res) => {
  const result = await ContactsModel.create({ ...req.body, owner: req.user._id });
  res.status(201).json({
    status: 'created',
    code: 201,
    data: {
      contact: result,
    },
  });
};

module.exports = addNewContact;
