import React from 'react';
import UserForm from '../../user/UserForm/UserForm';
import AuthService from '../../../services/authService';

const Signup = ({ onSignup }) => {
  const handleSignup = async (formData) => {
    try {
      const userData = await AuthService.signup(formData);
      onSignup(userData);
    } catch (error) {
      console.error('Error during signup:', error.message);
      // Handle error if needed
    }
  };

  return <UserForm formType="signup" onSubmit={handleSignup} />;
};

export default Signup;
