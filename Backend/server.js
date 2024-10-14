// Importing the Express framework and the initialization function
import express from 'express';
import initialize from './app/app.js';
import { config } from 'dotenv';
config();

const app =  express();
// Setting the port for the Express application
const port = 3000;

initialize(app);
app.listen(port, () => console.log(`Server is listening at port ${port}`));