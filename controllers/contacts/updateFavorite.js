const { ContactsModel } = require('../../models');
const { HttpError } = require('../../helpers');

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

module.exports = updateFavorite;
