const express = require('express') ;
const app = express();
const tasks = require('./routes/tasks') ;
const connectDB = require('./db/connect') ;
require('dotenv').config();
const errorHandlerMiddleware = require('./middleware/error-handler');

//port :
const port = 4000;

//middleware :
app.use(express.json()) ;
app.use('/api/tasks' , tasks) ;
app.use(errorHandlerMiddleware) ;

const start = async()=>{
    try{
        await connectDB(process.env.MONGO_URI) ;
        app.listen(port , console.log(`The server is listening on port ${port}...`));
    }
    catch(error){
        console.log(error) ;
    }
}
start();




