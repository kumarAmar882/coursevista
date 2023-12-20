import React, { useState } from 'react';
import './UserForm.css';

const UserForm = ({ formType, onSubmit }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    firstName: '',
    lastName: '',
    usertype: 'student',
    profileImage: '',
    bio: '',
    country: '',
    twoFactorAuthEnabled: false,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.id === 'usertype' ? e.target.value : e.target.value.trim(),
    });
  };

  const handleCheckboxChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.checked,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Error during form submission:', error);
      // Handle error if needed
    } finally {
      setLoading(false);
    }
  };

  const renderPasswordResetForm = () => (
    <>
      <p>Enter your new password:</p>
      <label htmlFor="password">New Password:</label>
      <input
        type="password"
        id="password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      {errors.password && <span className="error">{errors.password}</span>}
    </>
  );

  const renderPasswordRequestForm = () => (
    <>
      <p>Enter your email to receive a password reset link:</p>
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      {errors.email && <span className="error">{errors.email}</span>}
    </>
  );

  const renderSignInForm = () => (
    <>
      <label htmlFor="username">Username or Email:</label>
      <input
        type="text"
        id="username"
        value={formData.username}
        onChange={handleChange}
        required
      />
      {errors.username && <span className="error">{errors.username}</span>}

      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      {errors.password && <span className="error">{errors.password}</span>}
    </>
  );

  return (
    <div className="user-form">
      <h2>
        {formType === 'login'
          ? 'Login'
          : formType === 'signup'
          ? 'Sign Up'
          : formType === 'resetPassword'
          ? 'Reset Password'
          : formType === 'requestResetPassword'
          ? 'Request Password Reset'
          : ''}
      </h2>
      <form onSubmit={handleSubmit}>
        {formType === 'resetPassword' ? renderPasswordResetForm() : null}
        {formType === 'requestResetPassword' ? renderPasswordRequestForm() : null}

        {formType === 'login' && renderSignInForm()}

        {formType !== 'requestResetPassword' && formType !== 'login' && (
          <>

            <label htmlFor="username">User Name:</label>
            <input
              type="text"
              id="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            {errors.username && <span className="error">{errors.username}</span>}
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors.password && <span className="error">{errors.password}</span>}
            <label htmlFor="firstName">Email:</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <span className="error">{errors.email}</span>}
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            {errors.firstName && <span className="error">{errors.firstName}</span>}

            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
            {errors.lastName && <span className="error">{errors.lastName}</span>}

            <label htmlFor="usertype">User Type:</label>
            <select id="usertype" value={formData.usertype} onChange={handleChange}>
              <option value="student">Student</option>
              <option value="instructor">Instructor</option>
            </select>

            <label htmlFor="profileImage">Profile Image URL:</label>
            <input
              type="text"
              id="profileImage"
              value={formData.profileImage}
              onChange={handleChange}
            />

            <label htmlFor="bio">Bio:</label>
            <textarea id="bio" value={formData.bio} onChange={handleChange}></textarea>

            <label htmlFor="country">Country:</label>
            <input
              type="text"
              id="country"
              value={formData.country}
              onChange={handleChange}
            />

            <label htmlFor="twoFactorAuthEnabled">Enable Two-Factor Auth:</label>
            <input
              type="checkbox"
              id="twoFactorAuthEnabled"
              checked={formData.twoFactorAuthEnabled}
              onChange={handleCheckboxChange}
            />
          </>
        )}

        <button type="submit" disabled={loading}>
          {loading
            ? 'Loading...'
            : formType === 'login'
            ? 'Login'
            : formType === 'signup'
            ? 'Sign Up'
            : formType === 'resetPassword'
            ? 'Reset Password'
            : formType === 'requestResetPassword'
            ? 'Request Password Reset'
            : ''}
        </button>
      </form>
    </div>
  );
};

export default UserForm;
