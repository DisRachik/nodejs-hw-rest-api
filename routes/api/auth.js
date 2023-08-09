const express = require('express');
const authRouter = express.Router();

const { schemaUser, schemaUpdateSubscriptionForUser } = require('../../schemas');
const { isValidId, authenticate, upload } = require('../../middlewares');
const { authController } = require('../../controllers');
const { validateInputContact } = require('../../decorators');

// New user registration
authRouter.post('/register', validateInputContact(schemaUser), authController.register);

// Sign in
authRouter.post('/login', validateInputContact(schemaUser), authController.login);

// Sign out
authRouter.post('/logout', authenticate, authController.logout);

// Token validity check
authRouter.get('/current', authenticate, authController.getCurrent);

// Update subscription for user by id
authRouter.patch(
  '/',
  validateInputContact(schemaUpdateSubscriptionForUser),
  isValidId,
  authController.updateSubscription
);

// Update avatar
authRouter.patch('/avatars', authenticate, upload.single('avatar'), authController.updateAvatar);

module.exports = authRouter;
