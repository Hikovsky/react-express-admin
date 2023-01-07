const createError = require('http-errors')
const User = require('../models/userModel')
const validator = require('../validators/userValidators')

exports.getAllUsers = async (req, res) => {
	const users = await User.find({})
	return res.json(users)
}

exports.getUserById = async (req, res) => {
	const data = await validator.defaultSchema.validateAsync(req.params)
	if (!data) return res.status(400).json({ message: 'Invalid data' })

	const user = await User.findById(data.id)
	if (!user) return res.status(404).json(`User with given id not found`)

	return res.json(user)
}

exports.createUser = async (req, res) => {
	const data = await validator.registrSchema.validateAsync(req.body)
	if (!data) return res.status(400).json({ message: 'Invalid data' })

	const alreadyExists = await User.findOne({ username: data.username })
	if (alreadyExists) {
		return res
			.status(409)
			.json({ message: `User with given username already exists` })
	}

	const user = new User(data)
	const savedUser = await user.save()

	return res.json(savedUser)
}

exports.updateUser = async (req, res) => {
	const data = await validator.updateSchema.validateAsync({
		...req.params,
		...req.body,
	})
	if (!data) return res.status(400).json({ message: 'Invalid data' })

	const user = await User.findOne({ _id: data.id })
	if (!user) return res.status(404).json(`User with given id not found`)

	user.password = data.password
	const savedUser = await user.save()

	return res.json(savedUser)
}

exports.deleteUser = async (req, res) => {
	const data = await validator.defaultSchema.validateAsync(req.params)
	if (!data) return res.status(400).json({ message: 'Invalid data' })

	console.log(data)

	const user = await User.findById(data.id)
	if (!user) return res.status(404).json(`User with given id not found`)

	const deletedUser = user.deleteOne()
	return res.json(deletedUser)
}
