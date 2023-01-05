const User = require('../models/userModel')

exports.getAllUsers = (req, res) => {
	User.find({}, (err, users) => {
		if (err) res.status(500 || err.status).json({ message: err.message })
		users = users.map((user) => ({
			id: user._id,
			name: user.fullName,
			birthDate: user.birthDate,
		}))
		res.json(users)
	})
}

exports.getUserById = (req, res) => {
	const { id } = req.params
	User.findById(id, (err, user) => {
		if (err) res.status(400 || err.status).json({ message: err.message })
		user = {
			id: user._id,
			firstName: user.firstName,
			lastName: user.lastName,
			birthDate: user.birthDate,
		}
		res.json(user)
	})
}

exports.createUser = (req, res) => {
	const { firstName, lastName, birthDate } = req.body
	const user = new User({ firstName, lastName, birthDate })
	user.save((err, user) => {
		if (err) res.status(400 || err.status).json({ message: err.message })
		res.json(user)
	})
}

exports.updateUser = (req, res) => {
	const { id } = req.params
	const { firstName, lastName, birthDate } = req.body
	User.findByIdAndUpdate(
		id,
		{ firstName, lastName, birthDate },
		{ new: true },
		(err, user) => {
			if (err) res.status(500 || err.status).json({ message: err.message })
			res.json(user)
		}
	)
}

exports.deleteUser = (req, res) => {
	const { id } = req.params
	User.findByIdAndDelete(id, (err, user) => {
		if (err) res.status(500 || err.status).json({ message: err.message })
		res.json(user)
	})
}
