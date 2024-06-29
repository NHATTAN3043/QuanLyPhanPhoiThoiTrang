const express = require('express')
const router = express.Router()

const phieuNhapController = require('../app/controllers/PhieuNhapController')

router.get('/index', phieuNhapController.index)
router.get('/view-create', phieuNhapController.viewCreate)
router.post('/create', phieuNhapController.create)
router.get('/details/:MaPhieuNhap', phieuNhapController.details)
module.exports = router
