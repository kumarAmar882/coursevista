// src/modules/user/controller.js
const userModel = require('./model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const nodemailer = require('nodemailer');

const saltRounds = 10;
const transporter = nodemailer.createTransport({
  host: 'in-v3.mailjet.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAILJET_API_KEY,
    pass: process.env.MAILJET_SECRET_KEY,
  },
}); 
function isValidEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  // Check if the email matches the regex pattern
  if (!emailRegex.test(email)) {
    return false;
  }

  // Additional checks
  const parts = email.split('@');
  const username = parts[0];
  const domain = parts[1];

  // Check if the username and domain are not empty
  if (!username || !domain) {
    return false;
  }

  // Check if the domain has at least one dot
  if (domain.indexOf('.') === -1) {
    return false;
  }

  // Check if the last dot in the domain is not the last character
  if (domain.lastIndexOf('.') === domain.length - 1) {
    return false;
  }

  return true;
}


const UserController = {
  signup: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const {
        username,
        password,
        email,
        firstname,
        lastname,
        usertype,
      } = req.body;

      const existingUsername = await userModel.getUserByUsername(username);
      if (existingUsername) {
        return res.status(400).json({ error: 'Username is already taken' });
      }

      const existingEmail = await userModel.getUserByEmail(email);
      if (existingEmail) {
        return res.status(400).json({ error: 'Email is already registered' });
      }

      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const newUser = await userModel.createUser({
        username,
        password:hashedPassword,
        email,
        firstname,
        lastname,
        usertype,
        registrationdate: new Date(),
      });

      res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  login: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { usernameOrEmail, password } = req.body;
     // console.log(usernameOrEmail);

      if (!usernameOrEmail) {
        return res.status(400).json({ error: 'Username or email is required' });
      }

       // Check if the provided input is an email
       const iisEmail = isValidEmail(usernameOrEmail);

        let user;
        if (iisEmail) {
          user = await userModel.getUserByEmail(usernameOrEmail);
        } else {
          user = await userModel.getUserByUsername(usernameOrEmail);
        }

        console.log("user: ",user);

      if (!user) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      console.log("passwordMatch:", passwordMatch);

      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }

      const token = jwt.sign({ userId: user.userid, usertype: user.usertype }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      res.json({ token, user: { username: user.username, email: user.email, userType: user.usertype } });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  requestPasswordReset: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email } = req.body;

      const user = await userModel.getUserByEmail(email);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Generate a unique token for password reset
      const resettoken = jwt.sign({ userId: user.userid }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      // Save the token in the user record
      await userModel.saveResetToken(user.userid, resettoken);

      // Send a password reset email with Mailjet
      const resetLink = `${process.env.CLIENT_URL}/reset-password?token=${resettoken}`;
      const mailOptions = {
        from: 'btech10741.19@bitmesra.ac.in',
        to: user.email,
        subject: 'Password Reset Request',
        text: `Click the following link to reset your password: ${resetLink}`,
      };

      await transporter.sendMail(mailOptions);

      res.json({ message: 'Password reset email sent successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  resetPassword: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { token, newPassword } = req.body;

      // Verify the token
      let decodedToken;
      try {
        decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      } catch (error) {
        return res.status(401).json({ error: 'Invalid or expired token' });
      }

      const user = await userModel.getUserById(decodedToken.userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Update the password in the database
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
      await userModel.updateUserPassword(user.userid, hashedPassword);

      res.json({ message: 'Password reset successful' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },  
};

module.exports = UserController;
