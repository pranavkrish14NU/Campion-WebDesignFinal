import express from 'express';
import * as campgroundController from '../controllers/campground-controller.js';

const router = express.Router();

// Route for handling the retrieval of campgrounds
router.route('/')
.get(campgroundController.find);

export default router;