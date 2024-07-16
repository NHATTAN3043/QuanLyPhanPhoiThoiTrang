const express = require('express')
const router = express.Router()

const homeController = require('../app/controllers/HomeController')
const middlewareController = require('../app/controllers/MiddlewareController')

router.get('/home', middlewareController.verifytoken, homeController.pageHome)

module.exports = router;