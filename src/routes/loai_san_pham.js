const express = require('express')
const router = express.Router()

const lspController = require('../app/controllers/LoaiSanPhamController')
const MiddlewareController = require('../app/controllers/MiddlewareController')

router.get('/index',MiddlewareController.verifytokenandAdmin, lspController.index)
router.get('/view-edit/:MaLoaiSanPham',MiddlewareController.verifytokenandAdmin, lspController.viewEdit)
router.put('/edit/:MaLoaiSanPham',MiddlewareController.verifytokenandAdmin, lspController.edit)
router.get('/view-create',MiddlewareController.verifytokenandAdmin, lspController.viewCreate)
router.post('/create',MiddlewareController.verifytokenandAdmin, lspController.create)
router.delete('/delete/:MaLoaiSanPham',MiddlewareController.verifytokenandAdmin, lspController.delete)

module.exports = router
