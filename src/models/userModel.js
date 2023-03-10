const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			requierd: true,
			unique: true,
			lowercase: true,
			trim: true,
		},
		password: {
			type: String,
			requierd: true,
		},
	},
	{ timestamps: true }
)

module.exports = mongoose.model('User', userSchema)
