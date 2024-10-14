// Import necessary modules
import express from 'express';
import { setResponse } from '../controllers/response-handler.js';

// Create a router instance
const router = express.Router();

// Logout route
router.route('/')
  .get((req, res,next) => {
    // Logout user
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
    // Send a response indicating successful logout
    setResponse({ success: true, message: 'Logout successful' }, res);
    });
  });

// Export the router
export default router;