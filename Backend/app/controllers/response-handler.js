
// Function to set a successful response with status 200 and JSON data
export const setResponse = (data, response) => {
    response.status(200)
     .json(data);
     
}

// Function to set an error response with status 500 and a error message
export const setErrorResponse = (err, response) => {
    response.status(500)
   .json({
      code: "ServiceError",
      message: "Error occured while processing your request."
   });
}