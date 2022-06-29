// Models
const { Task } = require('../models/task.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');


const createTask = catchAsync(async (req, res, next) => {
	const { title, userId, limitDate } = req.body;

	const newTask = await Task.create({
	  title,
	  userId,
	  limitDate,
	});

	res.status(201).json({
		status: 'active',
		newTask,
	});
});

const getAllTask = catchAsync(async (req, res, next) => {

	const task = await Task.findAll();
	
	res.status(200).json({
		status: 'success',
		task,
	});
});
const getTaskStatus = catchAsync(async (req, res, next) => {

	const { stat} = req.params;
	const status =["active", "completed",  "late"];

	
	
	const task = await Task.find(
		status => status === stat
	);

	res.status(200).json({
		status: 'success',
		task,
	});
});


const updateTask = catchAsync(async (req, res, next) => {
	
	const { id } = req.body;
	const { limitDate } = req.body;
	const { startDate } = req.body;
	const { finishDate } = req.body;

	await Task.update({  title,
		id,
		limitDate, startDate, finishDate });

	res.status(204).json({ status: 'success' });
});

const deleteTask = catchAsync(async (req, res, next) => {
	const { id } = req.params;

	const user = await Task.findOne({ where: { id } });

	if (!user) {
		return res.status(404).json({
			status: 'error',
			message: 'User not found',
		});
	}

	// await user.destroy();
	await Task.update({ status: 'deleted' });

	res.status(204).json({ status: 'success' });
});

module.exports = {
	createTask,
	getAllTask,
	getTaskStatus,
	updateTask,
	deleteTask
};