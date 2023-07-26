const { Schema, model } = require('mongoose');
const { handleUpdateValidate, handleSaveError } = require('./hooks');

const contactsSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
  }
);

contactsSchema.pre('findOneAndUpdate', () => handleUpdateValidate);
contactsSchema.post('findOneAndUpdate', handleSaveError);
// виправлення помилки відповіді при непроходженні валідації з 500 на 400
contactsSchema.post('save', handleSaveError);

module.exports = model('contacts', contactsSchema);
