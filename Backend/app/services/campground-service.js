// Importing the Campground model
import Campground from '../models/campground.js';
import Review from '../models/review.js'
import { ObjectId } from 'mongodb';
import Booking from '../models/booking.js'


// Function to search for campgrounds based on given parameters
export const search = async (params = {}) =>{
    const campgrounds = await Campground.find(params).exec();
    return campgrounds;
 }

 // Function to save a new campground
 export const save = async (newCampground) => {
    console.log(newCampground)
    // Creating a new instance of the Campground model
    const campground = new Campground(newCampground);
    // Saving the new campground to the database
    const savedCampground = await campground.save();
    return savedCampground;
  }

  // Function to save a new Review
 export const saveReview = async (newReview) => {
  // Creating a new instance of the Campground model
  const review = new Review(newReview);
  // Saving the new campground to the database
  const savedReview = await review.save();
 
  return savedReview;
}

export const deleteReview = async (reviewid) => {
  const result = await Campground.updateOne(
    { "reviews": new ObjectId(reviewid) },
    { $pull: { "reviews": new ObjectId(reviewid)  } }
  );
    return result
  }

// Function to save a Booking
export const saveBooking = async (newBooking) => {
  // Creating a new instance of the Campground model
  const booking = new Booking(newBooking);
  // Saving the new campground to the database
  const savedBooking = await booking.save();
 
  return savedBooking;
}

  // Function to find a campground by ID
export const findById = async (id) => {
   const campground = await Campground.findById(id).populate({
    path: 'reviews',
    populate: {
        path: 'author'
    }
}).populate('author').exec(); 
   return campground;
 }


export const findBookingById = async (id) => {
  const booking = await Booking.findById(id).populate('booking').exec();
  return booking;
};


 // Function to remove a campground by ID
export const remove = async (id) => {
   return await Campground.findByIdAndDelete(id).exec();
 }

 // Function to update a campground by ID with new data
export const update = async (updatedCampground, id)=> {
  const campground = await Campground.findByIdAndUpdate(id, updatedCampground, { new: true }).exec();
  return campground;
}