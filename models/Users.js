const { Schema, model } = require('mongoose');
const { handleUpdateValidate, handleSaveError } = require('./hooks');
const { emailRegex, allowedSubscriptions } = require('../constants');

const usersSchema = new Schema(
  {
    password: {
      type: String,
      minlength: 6,
      required: [true, 'Set password for user'],
    },
    email: {
      type: String,
      match: emailRegex,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: allowedSubscriptions,
      default: 'starter',
    },
    token: String,
    avatarURL: String,
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

usersSchema.pre('findOneAndUpdate', () => handleUpdateValidate);
usersSchema.post('findOneAndUpdate', handleSaveError);
usersSchema.post('save', handleSaveError);

module.exports = model('users', usersSchema);
