const express = require('express')
const router = express.Router()

const sizeController = require('../app/controllers/SizeController')

router.get('/page-size', sizeController.ListSize)

module.exports = router;