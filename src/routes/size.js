const express = require('express')
const router = express.Router()

const sizeController = require('../controllers/SizeController')

router.get('/page-size', sizeController.ListSize)

module.exports = router;