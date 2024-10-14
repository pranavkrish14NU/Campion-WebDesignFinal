// Importing the Express framework
import express from 'express';
import * as currUserController from '../controllers/currUser-controller.js';

const router = express.Router();

// Route for handling the retrieval of campgrounds
router.route('/')
.get(currUserController.getCurrUser);

export default router