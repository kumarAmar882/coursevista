import React from 'react';
import { Modal, Spinner, Button } from 'react-bootstrap';
import Login from '../../auth/Login/Login';
import Signup from '../../auth/Signup/Signup';
import UserForm from '../../user/UserForm/UserForm';
import './AuthModal.css';

const AuthModal = ({
  showModal,
  handleClose,
  modalType,
  handleModalShow,
  handleLogin,
  handleSignup,
  handleResetPassword,
  handleRequestResetPassword,
  loading,
}) => {
  const isResetPassword = modalType === 'resetPassword';
  const isResetPasswordRequest = modalType === 'resetPasswordRequest';

  const renderModalContent = () => {
    return (
      <>
        <Modal.Header closeButton className="modal-header">
          <Modal.Title>
            {isResetPassword ? 'Reset Password' : isResetPasswordRequest ? 'Request Password Reset' : ''}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isResetPassword || isResetPasswordRequest ? (
            <UserForm
              formType={isResetPassword ? 'resetPassword' : 'requestResetPassword'}
              onSubmit={(formData) => (isResetPassword ? handleResetPassword(formData) : handleRequestResetPassword(formData))}
            />
          ) : modalType === 'login' ? (
            <>
              <Login onLogin={handleLogin} />
              <p>
                Forgot your password?{' '}
                <span className="auth-modal-link" onClick={() => handleModalShow('resetPasswordRequest')}>
                  Reset it here
                </span>
              </p>
              <Button variant="secondary" onClick={() => handleModalShow('signup')}>
                Sign Up
              </Button>
            </>
          ) : modalType === 'signup' ? (
            <Signup onSignup={handleSignup} />
          ) : null}
        </Modal.Body>
      </>
    );
  };

  return (
    <Modal show={showModal} onHide={handleClose} className="custom-modal">
      {loading ? (
        <Modal.Body className="text-center">
          <Spinner animation="border" />
        </Modal.Body>
      ) : (
        renderModalContent()
      )}
    </Modal>
  );
};

export default AuthModal;
