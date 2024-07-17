const express = require('express')
const router = express.Router()

const vanChuyenController = require('../app/controllers/VanChuyenController')
const MiddlewareController = require('../app/controllers/MiddlewareController')

router.get('/index',MiddlewareController.verifytokenandDeliver, vanChuyenController.index)
router.get('/details/:MaDeXuat',MiddlewareController.verifytokenandDeliver, vanChuyenController.details)
router.patch('/xacnhanvanchuyen/:action',MiddlewareController.verifytokenandDeliver, vanChuyenController.actionDelivery)

module.exports = router
