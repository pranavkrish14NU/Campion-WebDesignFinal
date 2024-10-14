import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/CurrentUser'; // Replace with the actual path
import { submitLogin } from '../api/login-api';
import { getCurrentUser } from '../api/fetchCurrentUser'; // Import your getCurrentUser function
import LoginImg from '../assets/Loginimg.svg'
import { Link } from 'react-router-dom';
import '../dist/Login.css';

const Login = () => {
  const { setCurrentUser } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [isError, setError] = useState(false);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleLogin = async () => {
    var errors: string[] = [];

    if (!username || username.trim() === '') {
      errors.push('Username is empty!');
    }

    if (!password || password.trim() === '') {
      errors.push('Password is empty!');
    }

    if (errors.length > 0) {
      setErrorMessages(errors);
      setError(true);
      setShowErrorModal(true);
    } else {
      try {
        const result = await submitLogin(username, password);

        if (result.success) {
          // Login was successful, fetch the current user and update currentUser
          const currentUser = await getCurrentUser();
          setCurrentUser(currentUser);

          
          setErrorMessages([`Hello ${username}!!!`, `You have logged in successfully!!!`]);
          setError(false);
          setShowErrorModal(true);

          if (username == "ADMIN"){

            navigate('/admin');
          }
          else{
          // Redirect to /campgrounds
          navigate('/campgrounds');
          }

          

        } else {
          // Login failed, handle the error
          setErrorMessages([result.error]);
          setError(true);
          setShowErrorModal(true);
        }
      } catch (error) {
        // Handle unexpected errors
        setErrorMessages(['Incorrect Username and Password']);
        setError(true);
        setShowErrorModal(true);
      }
    }
  };

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
    setErrorMessages([]);
  };

  return (
    <>
    <div className="loginpage">
      <div className="loginimg">
        <img src={LoginImg} alt="camping svg" />
      </div>
    <div className="login_container">
      <h2>Login</h2>
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
        
        <p>Don't have an Account? <Link to='/register'> Signup!</Link> </p>
        <button type="button" className="btn btn-primary" onClick={handleLogin}>
          Login
        </button>
      </form>

      {/* Custom Error Modal */}
      <Modal show={showErrorModal} onHide={handleCloseErrorModal}>
        <Modal.Header closeButton>
          {isError ? <Modal.Title>Unable to Login</Modal.Title> : <Modal.Title>Login Successful</Modal.Title>}
        </Modal.Header>
        <Modal.Body>
          {errorMessages.map((error, index) => (
            <p key={index} className={isError ? "error-text" : "error-text1"}>
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

export default Login;