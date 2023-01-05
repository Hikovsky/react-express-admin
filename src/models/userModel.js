const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
	firstName: { type: String, required: true, maxLength: 100, trim: true },
	lastName: { type: String, required: true, maxLength: 100, trim: true },
	birthDate: { type: Date, required: true },
})

userSchema.set('toObject', { virtuals: true })
userSchema.set('toJSON', { virtuals: true })

userSchema.virtual('fullName').get(function () {
	const firstName = this.firstName || ''
	const lastName = this.lastName || ''
	return `${firstName} ${lastName}`.trim()
})

module.exports = mongoose.model('User', userSchema)
