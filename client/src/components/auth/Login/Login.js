// Login.js
import React from 'react';
import UserForm from '../../user/UserForm/UserForm';
import AuthService from '../../../services/authService';

const Login = ({ onLogin }) => {
  const handleLogin = async (formData) => {
    try {
      const userData = await AuthService.login(formData);
      onLogin(userData);
    } catch (error) {
      console.error('Error during login:', error.message);
      // Handle error if needed
    }
  };


  return (
    <UserForm
      formType="login"
      onSubmit={handleLogin}
    />
  );
};

export default Login;
