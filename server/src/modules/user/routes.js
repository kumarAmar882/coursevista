// src/modules/user/routes.js
const express = require('express');
const { body } = require('express-validator');
const UserController = require('./controller');

const router = express.Router();

router.post(
  '/signup',
  [
    body('username').trim().isLength({ min: 5 }).withMessage('Username must be at least 5 characters long'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
    body('email').isEmail().normalizeEmail(),
    // Add validations for other fields...
  ],
  UserController.signup
);

router.post(
  '/login',
  [
    body('usernameOrEmail').trim().notEmpty().withMessage('Username or email is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  UserController.login
);

router.post(
  '/request-password-reset',
  [
    body('email').isEmail().normalizeEmail(),
  ],
  UserController.requestPasswordReset
);

router.post(
  '/reset-password',
  [
    body('token').notEmpty().withMessage('Token is required'),
    body('newPassword').isLength({ min: 8 }).withMessage('New password must be at least 8 characters long'),
  ],
  UserController.resetPassword
);

// Define routes for other user operations (e.g., update profile, change password, etc.)

module.exports = router;
