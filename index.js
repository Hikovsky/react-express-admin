require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
require('./src/services/mongoose')

const usersRouter = require('./src/routes/users')
const wordsRouter = require('./src/routes/words')

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use((req, res, next) => {
	console.log(`${req.method} ${req.path} - ${req.ip}`)
	next()
})

app.use('/users', usersRouter)
app.use('/words', wordsRouter)

app.listen(port, '0.0.0.0', () => {
	console.log(`Server is running on port ${port}`)
})
