import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import '../dist/Register.css'; 
import { submitRegister } from '../api/registrationapi';
import { Link } from 'react-router-dom';
import RegisterImg from '../assets/Register.svg'

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [isError, setError] = useState(false);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  const handleRegister = () => {
    var errors: string[] = [];

    if (!username || username.trim() === '') {
      errors.push('Username is empty!');
    }

    if (!email || email.trim() === '') {
      errors.push('Email is empty!');
    }

    if (!password || password.trim() === '') {
      errors.push('Password is empty!');
    }

    if (errors.length > 0) {
      setErrorMessages(errors);
      setError(true);
      setShowErrorModal(true);
    } else {
      
      submitRegister(username,email,password)
      // Implement your registration logic here
      setError(false);
      //alert(`Registering in with:\nUsername: ${username}\nEmail: ${email}\nPassword: ${password}`);
      setErrorMessages([`Hello ${username}!`, `successfully registered! Login to continue...`]);
      setShowErrorModal(true);
      console.log('Registering with:', username, email, password);
    }
  };

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
    setErrorMessages([]);
  };

  return (
    <>
    <div className='registerpage'>
    <div className='registerimg'><img src= {RegisterImg} alt='Register Img'></img> </div>
    <div className="register_container">
      <h2>Register</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <p>Already have an Account? <Link to='/login'> Login!</Link> </p>
        <button type="button" className="btn btn-success" onClick={handleRegister}>
          Register
        </button>
      </form>

      {/* Custom Error Modal */}
      <Modal show={showErrorModal} onHide={handleCloseErrorModal}>
        <Modal.Header closeButton>
          {isError ? <Modal.Title>Unable to Register</Modal.Title> : <Modal.Title>Registration Successful</Modal.Title>}
        </Modal.Header>
        <Modal.Body>
          {errorMessages.map((error, index) => (
            <p key={index} className={isError ? 'error-text' : 'error-text1'}>
              {error}
            </p>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseErrorModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    </div>
    </>
  );
};

export default Register;
