const Task = require('../models/tasks') ;

const getAllTasks = async (req,res)=>{
    const result = await Task.find() ;
    res.status(200).json({result}) ;
};
const createTask = async (req , res)=>{
    const task = new Task(req.body);
    try{
        const newTask = await task.save();
        res.json(newTask).status(201) ;
    }
    catch(error){
        res.json({message : error}).status(500) ;
    }
};
const getTask = async (req , res)=>{
    console.log(req.params.id) ;
    try{
        const task = await Task.find({_id : req.params.id}) ;
        if(!task){
            return res.status(404).json({msg : `no task with id : ${req.params.id}`});
        }
        res.json(task).status(200) ;
    }
    catch(error){
        res.json({message : error}).status(404) ;
    }
};
const deleteTask = async(req , res)=>{
    try{
        const {id : taskID} = req.params ;
        const task = await Task.findOneAndDelete({_id : taskID}) ;
        if(!task){
            return res.status(404).json({message : `no task with id : ${taskID}`}) ;
        }
        console.log(task);
        res.json({task}).status(204) ;
    }
    catch(error){
        res.status(500).json({message : error}) ;
    }
};
const updateTask = async (req , res)=>{
    try{
        const {id : taskID} = req.params ;
        const task = await Task.findByIdAndUpdate({_id : taskID} , req.body , {
            new : true ,
            runValidators : true ,
        });
        res.status(200).json(task) ;
    }
    catch(error){
        res.status(404).json({error_message : `task with id does not exist`}) ;
    }
};
module.exports = {
    getAllTasks,
    createTask,
    getTask,
    deleteTask,
    updateTask
};