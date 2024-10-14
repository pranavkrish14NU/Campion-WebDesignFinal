// import passport from 'passport';
// import { setResponse, setErrorResponse } from './response-handler.js';

// // Controller function to handle user login
// export const postUser = (req, res,next) => {
//     console.log("req"+req);
//     passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }),(err, user, info) => {
//         console.log("req"+req);
//         console.log("user"+user);
        
//                 // req.logIn(user, (err) => {
//                 //     if (err) { return next(err); }
//                 //     setResponse({ success: true, message: 'Login successful' }, res);
//                 //   });
                
//                   setResponse({ success: true, message: 'Login successful' }, res);
//                 }}