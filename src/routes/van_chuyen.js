const express = require('express')
const router = express.Router()

const vanChuyenController = require('../app/controllers/VanChuyenController')

router.get('/index', vanChuyenController.index)
router.get('/details/:MaDeXuat', vanChuyenController.details)
router.patch('/xacnhanvanchuyen/:action', vanChuyenController.actionDelivery)

module.exports = router
