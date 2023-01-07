const Word = require('../models/wordModel')
const validator = require('../validators/wordValidators')

const wordsController = {
	getAllWords: async (req, res) => {
		const words = await Word.find({})
		return res.json(words)
	},
	getWordById: async (req, res) => {
		const data = await validator.defaultSchema.validateAsync(req.params)
		if (!data) return res.status(400).json({ error: 'Invalid data' })

		const word = await Word.findById(data.id)
		if (!word) return res.status(404).json({ error: 'Word not found' })

		return res.json(word)
	},
	createWord: async (req, res) => {
		const data = await validator.registerSchema.validateAsync(req.body)
		if (!data) return res.status(400).json({ error: 'Invalid data' })

		const word = new Word(data)
		const savedWord = await word.save()

		return res.json(savedWord)
	},
	updateWord: async (req, res) => {
		const data = await validator.updateSchema.validateAsync({
			...req.params,
			...req.body,
		})
		if (!data) return res.status(400).json({ error: 'Invalid data' })

		const word = await Word.findOne({ _id: data.id })
		if (!word) return res.status(404).json({ error: 'Word not found' })

		data.original && (word.original = data.original)
		data.translated && (word.translated = data.translated)
		const savedWord = await word.save()

		return res.json(savedWord)
	},
	deleteWord: async (req, res) => {
		const data = await validator.defaultSchema.validateAsync(req.params)
		if (!data) return res.status(400).json({ error: 'Invalid data' })

		const word = await Word.findById(data.id)
		if (!word) return res.status(404).json({ error: 'Word not found' })

		const deletedWord = await word.delete()

		return res.json(deletedWord)
	},
}

module.exports = wordsController
