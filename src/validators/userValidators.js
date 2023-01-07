const Joi = require('joi')

const defaultSchema = Joi.object({
	id: Joi.string().required(),
})

const registrSchema = Joi.object({
	username: Joi.string().required().lowercase(),
	password: Joi.string().required().min(6),
})

const updateSchema = Joi.object({
	id: Joi.string().required(),
	password: Joi.string().required().min(6),
})

module.exports = {
	defaultSchema,
	registrSchema,
	updateSchema,
}
