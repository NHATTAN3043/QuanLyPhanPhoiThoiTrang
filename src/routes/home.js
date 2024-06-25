const express = require('express')
const router = express.Router()

const homeController = require('../controllers/HomeController')

router.get('/', homeController.pageHome)

module.exports = router;