const express = require('express');
const authRouter = express.Router();
const { authController } = require('../../controllers');
const { validateInputContact } = require('../../decorators');
const { schemaUser } = require('../../schemas');

// New user registration
authRouter.post('/register', validateInputContact(schemaUser), authController.register);

// Sign in
authRouter.post('/login', validateInputContact(schemaUser), authController.login);

module.exports = authRouter;
