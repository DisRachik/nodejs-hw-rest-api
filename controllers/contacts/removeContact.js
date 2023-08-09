const { ContactsModel } = require('../../models');
const { HttpError } = require('../../helpers');

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

module.exports = removeContact;
