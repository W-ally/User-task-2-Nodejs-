// Models
const { User } = require('../models/user.model');
const { Task } = require('../models/task.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

const createUser = catchAsync(async (req, res, next) => {
	const { name, email, password, status } = req.body;

	const newUser = await User.create({
		name,
		email,
		password,
		status,
	});

	res.status(201).json({
		status: 'User create',
		newUser,
	});
});

const getAllUsers = catchAsync(async (req, res, next) => {
	const users = await User.findAll({
		include: Task,
	});

	res.status(200).json({
		status: 'all users found!',
		users,
	});
});




const updateUser = catchAsync(async (req, res, next) => {
	const { user } = req;
	const { name } = req.body;
	const { email } = req.body;

	await user.update({ name, email });

	res.status(204).json({ status: 'success Update Data' });
});

const deleteUser = catchAsync(async (req, res, next) => {
	const { id } = req.params;

	const user = await User.findOne({ where: { id } });

	if (!user) {
		return res.status(404).json({
			status: 'error',
			message: 'User not found',
		});
	}

	// await user.destroy();
	await user.update({ status: 'disabled' });

	res.status(204).json({ status: 'disabled' });
});

module.exports = {
	getAllUsers,
	createUser,
	updateUser,
	deleteUser,
};
