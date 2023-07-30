const express = require('express');
const authRouter = express.Router();
const { authController } = require('../../controllers');
const { validateInputContact } = require('../../decorators');
const { schemaUser } = require('../../schemas');

authRouter.post('/register', validateInputContact(schemaUser), authController.register);

module.exports = authRouter;
