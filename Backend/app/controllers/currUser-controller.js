
import { setResponse, setErrorResponse } from './response-handler.js';

// Controller function to handle finding/searching for campgrounds
export const getCurrUser = async (request, response) => {
    try
    {
     const params = {...request.query};
    // Setting the response using the setResponse function
    setResponse(request.user, response);
  } catch (err) {
    // Handling error response if an error occurs
    setErrorResponse(err, response);
  }
};