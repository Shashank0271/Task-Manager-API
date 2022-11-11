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
        res.json(task).status(200) ;
    }
    catch(error){
        res.json({message : error}).status(500) ;
    }
};
const deleteTask = async(req , res)=>{
    try{
        await Task.deleteOne({name : req.params.id}) ;
        res.status(204).json() ;
    }
    catch(error){
        res.json({message : error}).status(500) ;
    }
};
const updateTask = async (req , res)=>{
    try{
        await Task.updateOne({name : req.params.id} , {completed : true});
        res.json({message : "updated"}).status(200) ;
    }
    catch(error){
        res.json({message : error}).status(500) ;
    }
};
module.exports = {
    getAllTasks,
    createTask,
    getTask,
    deleteTask,
    updateTask
};