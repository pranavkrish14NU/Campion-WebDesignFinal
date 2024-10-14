
import express from 'express';
import * as registerController from '../controllers/register-controller.js';

const router = express.Router();

// Route for handling the registration of users
router.route('/')
.post(registerController.postUser);
export default router