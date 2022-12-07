require("express-async-errors");
/*
If we directly use throw keyword ,(without catching the error and sending it to error 
handling middleware), its going to break the code (no response , console mei error aa jaega) . --crux
Thats why we used async wrapper concept .
This library removes the need of wrapping the controller in async function .
It allows us to directly throw the error , which whould then be provided to error handling middleware
If we have not defined any error handling middleware , the default error handler will execute .
(In this project we have the 'errorHandlerMiddleware' defined)
*/
const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const connectDB = require('./db/connect');
require('dotenv').config();
const errorHandlerMiddleware = require('./middleware/error-handler');

//port :
const port = 4000;

//middleware :
app.use(express.json());
app.use('/api/tasks', tasks);
app.use(errorHandlerMiddleware);

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, console.log(`The server is listening on port ${port}...`));
    }
    catch (error) {
        console.log(error);
    }
}
start();



