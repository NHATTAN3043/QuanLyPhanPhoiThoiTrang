const express = require('express')
const router = express.Router()

const chiTietSanPhamController = require('../app/controllers/ChiTietSanPhamController')

router.get('/index', chiTietSanPhamController.index)
router.get('/view-create', chiTietSanPhamController.viewCreate)
router.get('/view-edit/:MaChiTietSanPham', chiTietSanPhamController.viewEdit)
router.post('/create', chiTietSanPhamController.create)
router.put('/edit/:MaChiTietSanPham', chiTietSanPhamController.edit)
router.delete('/delete/:MaChiTietSanPham', chiTietSanPhamController.delete)
router.get('/detail/:MaChiTietSanPham', chiTietSanPhamController.detail)
module.exports = router
