const express = require('express') ;
const {
    getAllTasks ,
    createTask ,
    getTask , 
    deleteTask , 
    updateTask
} = require('../controllers/tasks');

const router = express.Router() ;
router.route('/').get(getAllTasks).post(createTask) ;
router.route('/:id').patch(updateTask).get(getTask).delete(deleteTask) ;

module.exports = router ;