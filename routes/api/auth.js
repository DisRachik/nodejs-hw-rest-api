const express = require('express');
const authRouter = express.Router();

const { schemaUser } = require('../../schemas');
const { authenticate } = require('../../middlewares');
const { authController } = require('../../controllers');
const { validateInputContact } = require('../../decorators');

// New user registration
authRouter.post('/register', validateInputContact(schemaUser), authController.register);

// Sign in
authRouter.post('/login', validateInputContact(schemaUser), authController.login);

// Sign out
authRouter.post('/logout', authenticate, authController.logout);

module.exports = authRouter;
