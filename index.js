require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const db = require('./src/services/mongoose').connect()

const usersRouter = require('./src/routes/users')

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/users', usersRouter)

app.get('/', (req, res) => {
	res.json({ message: 'Hello World!' })
})

app.listen(port, () => {
	console.log(`Server is running on port ${port}`)
})
