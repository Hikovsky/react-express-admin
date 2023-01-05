const mongoose = require('mongoose')

const MONGO_URI = process.env.MONGO_URI

function connect() {
	mongoose.connect(MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	mongoose.connection.on(
		'error',
		console.error.bind(console, 'MongoDB connection error:')
	)
	return mongoose.connection
}

module.exports = { connect }
