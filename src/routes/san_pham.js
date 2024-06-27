const express = require('express')
const router = express.Router()

const sanPhamController = require('../app/controllers/SanPhamController')

router.get('/index', sanPhamController.index)
router.get('/view-edit/:MaSanPham', sanPhamController.viewEdit)
router.put('/edit/:MaSanPham', sanPhamController.edit)
router.get('/view-create', sanPhamController.viewCreate)
router.post('/create', sanPhamController.create)
router.delete('/delete/:MaSanPham', sanPhamController.delete)

module.exports = router
