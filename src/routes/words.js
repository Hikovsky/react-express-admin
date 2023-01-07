const express = require('express')
const router = express.Router()
const wordController = require('../controllers/wordsController')

router.get('/', wordController.getAllWords)
router.get('/:id', wordController.getWordById)
router.post('/', wordController.createWord)
router.patch('/:id', wordController.updateWord)
router.delete('/:id', wordController.deleteWord)

module.exports = router
