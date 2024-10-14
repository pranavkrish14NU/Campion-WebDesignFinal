 import express from 'express';
 import * as loginController from '../controllers/login-controller.js';
 import passport from 'passport';
import { setResponse, setErrorResponse } from '../controllers/response-handler.js';
 const router = express.Router();
 
 // Route for handling the registration of users
 router.route('/')
 .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }),(req, res,) => {
                if(req.isAuthenticated()){
                    setResponse({ success: true, message: 'Login successful' }, res);
                }
   });
 export default router