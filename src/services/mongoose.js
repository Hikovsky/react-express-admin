const mongoose = require('mongoose')

mongoose
	.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log('MongoDB Connected')
	})

mongoose.connection.on(
	'error',
	console.error.bind(console, 'MongoDB connection error:')
)

mongoose.connection.on('disconnected', () => {
	console.log('MongoDB disconnected')
})

process.on('SIGINT', () => {
	mongoose.connection.close(() => {
		console.log('MongoDB disconnected through app termination')
		process.exit(0)
	})
})
