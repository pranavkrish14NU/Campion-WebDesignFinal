// Importing necessary modules and dependencies

import { config } from 'dotenv';
config();

import cors from 'cors';
import express from 'express';
import registerRouter from './routes/index.js';

import mongoose  from 'mongoose';
import { campgroundRoute, registerRoute, loginRoute, logoutRoute, currUserRoute } from '../app/routes/index.js';
import models from './models/index.js';
import passport from 'passport';
import localStrategy from 'passport-local';
import session from 'express-session';
import FileStore from 'session-file-store';
const FileStoreSession = FileStore(session);
import User from './models/user.js';


// Mapbox token





const sessionConfig ={
  secret: 'thisisasecret',
  resave: false,
  saveUninitialized: true,
  //store: new FileStoreSession(),
  cookie: {
    httpOnly: false,
    maxAge: 3600000,
     // Add this for HTTPS
    sameSite: 'lax',
    // Add 'Secure' for HTTPS
  },
}
const initialize = (app) =>{
  // Enabling Cross-Origin Resource Sharing
  app.use(cors({
    origin: `http://localhost:3001` , // Replace with your React app's origin
    credentials: true,
  }));
  // Parsing incoming JSON requests
  app.use(express.json());
  // Parsing incoming URL-encoded requests
  app.use(express.urlencoded());

  

  

  //sessionConfig middleware
 // sessionConfig middleware
// Order of middleware matters
app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());


// Passport local strategy setup
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req, res, next) => {
  console.log(`the requested session${req.session.app}`)
  res.locals.currentUser = req.user;
  // res.locals.success = req.flash('success');
  // res.locals.error = req.flash('error');
  next();
})

  //using passport fro authentication 
  

      // Connecting to the MongoDB database 
  mongoose.connect('mongodb+srv://dhanasegarant:IWBrTykhxUAyA2mJ@cluster.sxxa7pl.mongodb.net/CampgroundDB?retryWrites=true&w=majority');
  campgroundRoute(app);
  registerRoute(app);
  loginRoute(app);
  logoutRoute (app)
  currUserRoute(app)

  // Connecting to the MongoDB database
  mongoose.connect('mongodb+srv://dhanasegarant:IWBrTykhxUAyA2mJ@cluster.sxxa7pl.mongodb.net/CampgroundDB?retryWrites=true&w=majority');
  // Adding routes
  registerRouter(app);
};


export default initialize;