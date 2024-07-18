const express = require('express')
const router = express.Router()

const sanPhamController = require('../app/controllers/SanPhamController')
const MiddlewareController = require('../app/controllers/MiddlewareController')

router.get('/index', MiddlewareController.verifytokenandAdmin, sanPhamController.index)
router.get('/view-edit/:MaSanPham', MiddlewareController.verifytokenandAdmin, sanPhamController.viewEdit)
router.put('/edit/:MaSanPham',MiddlewareController.verifytokenandAdmin, sanPhamController.edit)
router.get('/view-create',MiddlewareController.verifytokenandAdmin, sanPhamController.viewCreate)
router.post('/create',MiddlewareController.verifytokenandAdmin, sanPhamController.create)
router.delete('/delete/:MaSanPham',MiddlewareController.verifytokenandAdmin, sanPhamController.delete)

module.exports = router
