const { off } = require('../models/tasks');
const Task = require('../models/tasks') ;

const getAllTasks = async (req,res)=>{
    const result = await Task.find() ;
    res.status(200).json({result}) ;
};
const createTask = async (req , res)=>{
    const task = new Task(req.body);
    try{
        const newTask = await task.save();
        res.status(201).json(newTask) ;
    }
    catch(error){
        res.status(500).json({message : error}) ;
    }
};
const getTask = async (req , res)=>{
    try{
        const task = await Task.findById({_id : req.params.id}) ;
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
        const task = await Task.findByIdAndDelete({_id : taskID}) ;
        if(!task){
            return res.status(404).json({message : `no task with id : ${taskID}`}) ;
        }
        console.log(task);
        res.status(204).json();
    }
    catch(error){
        res.status(500).json({message : error}) ;
    }
};
const updateTask = async (req , res)=>{
    try{
        const {id : taskID} = req.params ;
        const task = await Task.findByIdAndUpdate(taskID , req.body , {
            new : true ,
            runValidators : true ,
        });
        if(!task){
            return res.status(404).json({message : `document with id ${taskID} does not exist`});
        }
        else{
            res.status(200).json(task) ;
        }
    }
    catch(error){
        console.log(error) ;
        res.status(500).json({error_message : `internal server error`}) ;
    }
};
module.exports = {
    getAllTasks,
    createTask,
    getTask,
    deleteTask,
    updateTask
};