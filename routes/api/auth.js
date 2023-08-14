const express = require('express');
const authRouter = express.Router();

const { schemaUser, schemaUpdateSubscriptionForUser, schemaUserEmail } = require('../../schemas');
const { isValidId, authenticate, upload } = require('../../middlewares');
const { validateInputContact } = require('../../decorators');
const {
  register,
  verifyEmail,
  resendVerifyEmail,
  login,
  logout,
  getCurrent,
  updateSubscription,
  updateAvatar,
} = require('../../controllers/auth');

// New user registration
authRouter.post('/register', validateInputContact(schemaUser), register);

// Verification Email
authRouter.get('/verify/:verificationToken', verifyEmail);

// re-sending an email to the user with a link for verification
authRouter.post('/verify', validateInputContact(schemaUserEmail), resendVerifyEmail);

// Sign in
authRouter.post('/login', validateInputContact(schemaUser), login);

// Sign out
authRouter.post('/logout', authenticate, logout);

// Token validity check
authRouter.get('/current', authenticate, getCurrent);

// Update subscription for user by id
authRouter.patch(
  '/',
  validateInputContact(schemaUpdateSubscriptionForUser),
  isValidId,
  updateSubscription
);

// Update avatar
authRouter.patch('/avatars', authenticate, upload.single('avatar'), updateAvatar);

module.exports = authRouter;
