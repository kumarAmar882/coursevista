const pool = require('../../config/db');
const bcrypt = require('bcrypt');

const getUserByUsername = async (username) => {
  const query = 'SELECT * FROM users WHERE username = $1';
  const values = [username];
  const result = await pool.query(query, values);
  return result.rows[0];
};

const getUserById = async (userid) => {
  const query = 'SELECT * FROM users WHERE userid = $1';
  const values = [userid];
  const result = await pool.query(query, values);
  return result.rows[0];
};

const getUserByEmail = async (email) => {
  const query = 'SELECT * FROM users WHERE email = $1';
  const values = [email];
  const result = await pool.query(query, values);
  return result.rows[0];
};

const getUserByResetToken = async (resetToken) => {
  const query = 'SELECT * FROM users WHERE reset_token = $1';
  const values = [resetToken];
  const result = await pool.query(query, values);
  return result.rows[0];
};

const createUser = async (user) => {
  const {
    username,
    password,
    email,
    firstname,
    lastname,
    usertype,
    registrationdate,
  } = user;

  const query = `
    INSERT INTO users 
      (username, password, email, firstname, lastname, usertype, registrationdate)
    VALUES
      ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
  `;

  const values = [username, password, email, firstname, lastname, usertype, registrationdate];

  const result = await pool.query(query, values);
  return result.rows[0];
};

const updateUserPassword = async (userId, newPassword, resetToken = null) => {
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  const query = 'UPDATE users SET password = $1, resettoken = $2 WHERE userid = $3 RETURNING *';
  const values = [hashedPassword, resetToken, userId];
  const result = await pool.query(query, values);
  return result.rows[0];
};

const saveResetToken = async (userId, resetToken) => {
  const query = 'UPDATE users SET resettoken = $1 WHERE userid = $2 RETURNING *';
  const values = [resetToken, userId];
  const result = await pool.query(query, values);
  return result.rows[0];
};

module.exports = {
  getUserByUsername,
  getUserByEmail,
  getUserByResetToken,
  createUser,
  updateUserPassword,
  saveResetToken,
  getUserById,
};
