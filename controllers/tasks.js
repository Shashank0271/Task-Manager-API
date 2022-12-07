const Task = require('../models/tasks');
const asyncWrapper = require('../middleware/async');
const { createCustomError, CustomAPIError } = require('../errors/custom-error');


// const getAllTasks = asyncWrapper(async (_,res)=>{
//     const result = await Task.find() ;
//     res.status(200).json({result}) ;
// });

const getAllTasks = async (_, res) => {
    const result = await Task.find();
    res.status(200).json({ result });
};

const createTask = async (req, res) => {
    const task = new Task(req.body);
    const newTask = await task.save();
    res.status(201).json(newTask);
};

const getTask = async (req, res, next) => {
    const task = await Task.findById({ _id: req.params.id });
    if (!task) {
        throw new CustomAPIError('Not found', 404); // we can directly throw it since we use async library it will directly go to the error handling middleware
        //return next(createCustomError('Not found', 404)); //goes to error handling middleware , since thats the order of declaration in the app.js file
    }
    res.status(200).json(task);
};

const deleteTask = async (req, res, next) => {
    const { id: taskID } = req.params;
    const task = await Task.findByIdAndDelete({ _id: taskID });
    console.log(task);
    if (!task) {
        throw new CustomAPIError(`no task with id : ${taskID}`, 404);
        // return next(createCustomError(`no task with id : ${taskID}`, 404));
    }
    res.status(204).json();
};

const updateTask = async (req, res, next) => {
    const { id: taskID } = req.params;
    const task = await Task.findByIdAndUpdate(taskID, req.body, {
        new: true,
        runValidators: true,
    });
    if (!task) {
        throw new CustomAPIError(`document with id ${taskID} does not exist`, 404);
        // return next(createCustomError(`document with id ${taskID} does not exist`, 404));
    }
    res.status(200).json(task);
};

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    deleteTask,
    updateTask
};