const mongoose = require('mongoose')

const wordSchema = new mongoose.Schema({
	original: {
		type: String,
		required: true,
		unique: true,
		lowertcase: true,
		trim: true,
	},
	translated: {
		type: String,
		required: true,
		lowertcase: true,
		trim: true,
	},
})

module.exports = mongoose.model('Word', wordSchema)
