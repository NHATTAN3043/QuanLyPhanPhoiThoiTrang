const express = require('express')
const router = express.Router()

const chiTietSanPhamController = require('../app/controllers/ChiTietSanPhamController')
const MiddlewareController = require('../app/controllers/MiddlewareController')

router.get('/index',MiddlewareController.verifytokenandAdmin, chiTietSanPhamController.index)
router.get('/view-create', MiddlewareController.verifytokenandAdmin, chiTietSanPhamController.viewCreate)
router.get('/view-edit/:MaChiTietSanPham', MiddlewareController.verifytokenandAdmin, chiTietSanPhamController.viewEdit)
router.post('/create', MiddlewareController.verifytokenandAdmin, chiTietSanPhamController.create)
router.put('/edit/:MaChiTietSanPham', MiddlewareController.verifytokenandAdmin, chiTietSanPhamController.edit)
router.delete('/delete/:MaChiTietSanPham', MiddlewareController.verifytokenandAdmin, chiTietSanPhamController.delete)
router.get('/detail/:MaChiTietSanPham', MiddlewareController.verifytokenandAdmin, chiTietSanPhamController.detail)
module.exports = router
