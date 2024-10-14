import * as campgroundService from "../services/campground-service.js";
import Review from "../models/review.js";
import Booking from "../models/booking.js";
import { setResponse, setErrorResponse } from "./response-handler.js";
import mbxGeocoding from "@mapbox/mapbox-sdk/services/geocoding.js";
const mapBoxToken = "pk.eyJ1IjoicGF3YW5rdW1hcjk2NTYiLCJhIjoiY2xwd3VlZHoyMGZsMjJqcWVveGxteHJuMyJ9.f4wNyHRKL4RsOKM0QYTafw";
const geocoder = mbxGeocoding({ accessToken: mapBoxToken });


// Controller function to handle finding/searching for campgrounds
export const find = async (request, response) => {
  try {
    const params = { ...request.query };
    // Calling the campgroundService to search for campgrounds based on the parameters
    const campgrounds = await campgroundService.search(params);

    // Setting the response using the setResponse function
    setResponse(campgrounds, response);
  } catch (err) {
    // Handling error response if an error occurs
    setErrorResponse(err, response);
  }
};

// Controller function to handle posting/creating a new campground
export const postNewCampground = async (request, response) => {
  try {
    if (!request.isAuthenticated()) {
      return response.status(401).json({ error: "User not authenticated" });
    }
    const geoData = await geocoder.forwardGeocode({
      query: request.body.location,
      limit: 1
  }).send()
  console.log(geoData.body.features[0].geometry)
    console.log("Route hit!");
    console.log(`request body in server ${JSON.stringify(request.body)}`);
    const newCampground = { ...request.body };
    newCampground.author = request.user._id;
    newCampground.geometry = geoData.body.features[0].geometry;
    // Calling the campgroundService to save the new campground
    const campground = await campgroundService.save(newCampground);
    setResponse(campground, response);
  } catch (err) {
    console.log(err);
    // Handling and setting error response if an error occurs
    setErrorResponse(err, response);
  }
};

// Controller function to handle getting a campground by ID
export const getById = async (request, response) => {
  try {
    const id = request.params.id;
    // Calling the campgroundService to find a campground by ID
    const campground = await campgroundService.findById(id);
    setResponse(campground, response);
  } catch (err) {
    setErrorResponse(err, response);
  }
};

// Controller function to handle removing a campground by ID
export const remove = async (request, response) => {
  console.log("request.user " + request.user);
  if (!request.isAuthenticated()) {
    return response.status(401).json({ error: "User not authenticated" });
  }
  try {
    const id = request.params.id;
    // Calling the campgroundService to remove the campground by ID
    const campground = await campgroundService.remove(id);
    setResponse({}, response);
  } catch (err) {
    setErrorResponse(err, response);
  }
};

// Controller function to handle updating a campground by ID
export const put = async (request, response) => {
  if (!request.isAuthenticated()) {
    return response.status(401).json({ error: "User not authenticated" });
  }
  try {
    const geoData = await geocoder.forwardGeocode({
      query: request.body.location,
      limit: 1
  }).send()
    const id = request.params.id;
    const updatedCampground = { ...request.body };
    updatedCampground.geometry = geoData.body.features[0].geometry;
    // Calling the campgroundService to update the campground by ID
    const campground = await campgroundService.update(updatedCampground, id);
    const c = setResponse(campground, response);
  } catch (err) {
    setErrorResponse(err, response);
  }
};

// Review Postings done here
export const reviewPost = async (request, response) => {
  console.log("request.user " + request.user);
  if (!request.isAuthenticated()) {
    return response.status(401).json({ error: "User not authenticated" });
  }
  try {
    const id = request.params.id;
    // Calling the campgroundService to find a campground by ID
    const campground = await campgroundService.findById(id);

    const review = new Review(request.body.review);
    review.author = request.user._id;
    const saveReview = await campgroundService.saveReview(review);
    campground.reviews.push(saveReview.id);
    const campgroundnew = await campgroundService.save(campground);

    console.log(`campground ${campgroundnew}`);
    // sending review data to persist in DB
    setResponse(campgroundnew, response);
  } catch (err) {
    console.log(err);
    setErrorResponse(err, response);
  }
};

// Controller function to delete a review by ID
export const reviewDelete = async (request, response) => {
  if (!request.isAuthenticated()) {
    return response.status(401).json({ error: "User not authenticated" });
  }
  try {
    const id = request.params.id;
    const campground = await campgroundService.findById(id);
    const reviewIdToDelete = request.params.reviewid;
    console.log(`review to be deleted ${reviewIdToDelete}`);
    const result = await campgroundService.deleteReview(reviewIdToDelete);
    if (result.modifiedCount === 1) {
      console.log(`Review with ID ${reviewIdToDelete} deleted successfully.`);
    } else {
      console.log(`Review with ID ${reviewIdToDelete} not found.`);
    }
    // sending review data to persist in DB
    setResponse(result, response);
  } catch (err) {
    console.log(err);
    setErrorResponse(err, response);
  }
};

// Controller function to handle posting/creating a new booking request
export const bookingPost = async (request, response) => {
  if (!request.isAuthenticated()) {
    return response.status(401).json({ error: "User not authenticated" });
  }
  try {
    const id = request.params.id;
    const campground = await campgroundService.findById(id);
    if (!campground) {
      return setErrorResponse("Campground not found", response, 404);
    }
    const booking = new Booking(request.body.booking);
    const savedBooking = await campgroundService.saveBooking(booking);
    if (!savedBooking) {
      return setErrorResponse("Failed to save booking", response, 500);
    }
    campground.booking.push(savedBooking.id);
    const updatedCampground = await campgroundService.save(campground);
    setResponse(updatedCampground, response);
  } catch (err) {
    console.log(err);
    setErrorResponse(err, response);
  }
};
