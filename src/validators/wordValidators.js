const Joi = require('joi')

const wordValidators = {
	defaultSchema: Joi.object({
		id: Joi.string().required(),
	}),
	registerSchema: Joi.object({
		original: Joi.string().required(),
		translated: Joi.string().required(),
	}),
	updateSchema: Joi.object({
		id: Joi.string().required(),
		original: Joi.string(),
		translated: Joi.string(),
	}),
}

module.exports = wordValidators
