const { ContactsModel } = require('../../models');
const { HttpError } = require('../../helpers');

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

module.exports = getById;
