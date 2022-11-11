const mongoose = require('mongoose') ;

const TaskSchema = mongoose.Schema({
    name : {
        type : String,
        require : [true , 'name must be provided'],
        trim : true,
        maxlength : [20 , 'name is too large'],
        minlength : [1 , 'cannot store empty string']
    } ,
    completed : {
        type : Boolean,
        default : false,
    }
});

module.exports = mongoose.model('Task' , TaskSchema) ;
