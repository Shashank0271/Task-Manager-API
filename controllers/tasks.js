const Task = require('../models/tasks') ;

const getAllTasks = async (req,res)=>{
    const result = await Task.find() ;
    res.status(200).json({result}) ;
};
const createTask = async (req , res)=>{
    console.log(req.body) ;
    const task = new Task(req.body);
    try{
        const newTask = await task.save();
        res.json(newTask).status(201) ;
    }
    catch(error){
        res.json({error : error}) ;
    }
};
const getTask = (req , res)=>{
    res.json({id : req.params.id}) ;
};
const deleteTask = (req , res)=>{
    res.send("deleted task") ;
};
const updateTask = (req , res)=>{
    res.send("updated task") ;
};
module.exports = {
    getAllTasks,
    createTask,
    getTask,
    deleteTask,
    updateTask
};