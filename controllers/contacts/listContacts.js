const { ContactsModel } = require('../../models');

const listContacts = async (req, res) => {
  const { page = 1, limit = 10, ...query } = req.query;
  const skip = (page - 1) * limit;

  const result = await ContactsModel.find({ owner: req.user._id, ...query }, '', { skip, limit });
  res.status(200).json({
    status: 'success',
    code: 200,
    data: {
      contacts: result,
    },
  });
};

module.exports = listContacts;
