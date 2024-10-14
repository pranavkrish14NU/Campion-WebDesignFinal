// Importing the Express framework
import express from 'express';
import * as campgroundController from '../controllers/campground-controller.js';
import isLoggedIn from '../middleware/isLoggedIn.js';

const router = express.Router();

// Route for handling the retrieval of campgrounds
router.route('/')
.get(campgroundController.find);

// Route for handling the creation of a new camground
router.route('/new')
.post(campgroundController.postNewCampground);

// Route for handling the retrieval of a specific campground by ID
// and the deletion of a campground by ID
router.route('/:id')
.get(campgroundController.getById)
.delete(campgroundController.remove);

 
// Route for handling the update of a campground by ID
router.route('/:id/edit')
.put(campgroundController.put);

router.route('/:id/reviews')
.post(campgroundController.reviewPost);

// Route for deleting the campground by ID 
router.route('/:id/reviews/:reviewid')
.delete(campgroundController.reviewDelete);

// Route for handling the creation of a new booking request 
router.route('/:id/booking')
.post(campgroundController.bookingPost);


export default router;
