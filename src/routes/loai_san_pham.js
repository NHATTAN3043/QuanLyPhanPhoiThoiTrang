const express = require('express')
const router = express.Router()

const lspController = require('../app/controllers/LoaiSanPhamController')

router.get('/index', lspController.index)
router.get('/view-edit/:MaLoaiSanPham', lspController.viewEdit)
router.put('/edit/:MaLoaiSanPham', lspController.edit)
router.get('/view-create', lspController.viewCreate)
router.post('/create', lspController.create)
router.delete('/delete/:MaLoaiSanPham', lspController.delete)

module.exports = router
