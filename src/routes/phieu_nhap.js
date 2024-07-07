const express = require('express')
const router = express.Router()

const phieuNhapController = require('../app/controllers/PhieuNhapController')

router.get('/index', phieuNhapController.index)
router.get('/trash', phieuNhapController.trash)
router.post('/create', phieuNhapController.create)
router.put('/updateCTPN', phieuNhapController.updateCTPN)
router.get('/view-create', phieuNhapController.viewCreate)
router.get('/details/:MaPhieuNhap', phieuNhapController.details)
router.get('/detailCTPX/:MaPhieuNhap', phieuNhapController.detailCTPN)
router.get('/chonsanpham/:MaPhieuNhap', phieuNhapController.selectProduct)
router.post('/addchitietphieunhap', phieuNhapController.addCTPN)
router.post('/addchitietphieunhaps', phieuNhapController.addCTPNs)
router.post('/handle-indexform-actions', phieuNhapController.handleIndexFormActions)
router.delete('/deletectpn', phieuNhapController.deleteCTPN)
router.patch('/restore/:MaPhieuNhap', phieuNhapController.restorePhieuNhap)
router.delete('/softDelete/:MaPhieuNhap', phieuNhapController.softDelete)
router.delete('/destroy/:MaPhieuNhap', phieuNhapController.destroyPhieuNhap)

module.exports = router
    