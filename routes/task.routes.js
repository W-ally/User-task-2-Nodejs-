const express = require('express');

// Controllers
const {
	createTask,
	getAllTask,
	getTaskStatus,
	updateTask,
	deleteTask,
} = require('../controllers/task.controller');
const { createTaskValidators } = require('../middlewares/validators.middleware');
//middleWARE
const{
	validateStatus,
	validateTask,
	comparateDate
}= require('../middlewares/task.middleware')

const taskRouter = express.Router();

taskRouter.post('/',createTaskValidators, createTask);

taskRouter.get('/', getAllTask);

taskRouter.get('/:status',validateStatus, getTaskStatus);

taskRouter.patch('/:id',validateTask, comparateDate, updateTask);

taskRouter.delete('/:id', deleteTask);

module.exports = { taskRouter };
