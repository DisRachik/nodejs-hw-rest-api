const { schemaContact, schemaUpdateFavoriteForContact } = require('./contacts-schema');
const { schemaUser, schemaUpdateSubscriptionForUser, schemaUserEmail } = require('./users-schema');

module.exports = {
  schemaContact,
  schemaUpdateFavoriteForContact,
  schemaUser,
  schemaUserEmail,
  schemaUpdateSubscriptionForUser,
};
