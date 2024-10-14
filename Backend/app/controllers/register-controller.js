import * as registerService from '../services/register-service.js';
import { setResponse, setErrorResponse } from './response-handler.js';

// Controller function to handle finding/searching for campgrounds
export const postUser = async (request, response) => {

    try{
        console.log('Route hit!');
        console.log(`request body in server ${JSON.stringify(request.body)}`);
        const newUser = {...request.body};
        // Calling the campgroundService to save the new campground
        const register = await registerService.save(newUser);
  
        setResponse(register, response);
    }catch (err){
      console.log(err)
      // Handling and setting error response if an error occurs
        setErrorResponse(err, response);
    }
  }