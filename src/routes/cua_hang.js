const express = require('express')
const router = express.Router()

const cuaHangController = require('../app/controllers/CuaHangController')
const MiddlewareController = require('../app/controllers/MiddlewareController')

router.get('/index',MiddlewareController.verifytokenandAdmin, cuaHangController.index)
router.get('/view-create', MiddlewareController.verifytokenandAdmin, cuaHangController.viewCreate)
router.post('/create', MiddlewareController.verifytokenandAdmin, cuaHangController.create)
router.get('/view-edit/:MaCuaHang', MiddlewareController.verifytokenandAdmin, cuaHangController.viewEdit)
router.put('/edit', MiddlewareController.verifytokenandAdmin, cuaHangController.edit)
router.delete('/delete/:MaCuaHang',MiddlewareController.verifytokenandAdmin, cuaHangController.delete)


module.exports = router
