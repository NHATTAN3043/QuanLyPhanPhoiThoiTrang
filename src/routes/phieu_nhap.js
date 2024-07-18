const express = require('express')
const router = express.Router()

const phieuNhapController = require('../app/controllers/PhieuNhapController')
const MiddlewareController = require('../app/controllers/MiddlewareController')

router.get('/index',MiddlewareController.verifytokenandAdmin, phieuNhapController.index)
router.get('/trash', MiddlewareController.verifytokenandAdmin, phieuNhapController.trash)
router.post('/create', MiddlewareController.verifytokenandAdmin, phieuNhapController.create)
router.put('/updateCTPN', MiddlewareController.verifytokenandAdmin, phieuNhapController.updateCTPN)
router.get('/view-create', MiddlewareController.verifytokenandAdmin, phieuNhapController.viewCreate)
router.get('/details/:MaPhieuNhap', MiddlewareController.verifytokenandAdmin, phieuNhapController.details)
router.get('/detailCTPX/:MaPhieuNhap', MiddlewareController.verifytokenandAdmin, phieuNhapController.detailCTPN)
router.get('/chonsanpham/:MaPhieuNhap', MiddlewareController.verifytokenandAdmin, phieuNhapController.selectProduct)
router.post('/addchitietphieunhap', MiddlewareController.verifytokenandAdmin, phieuNhapController.addCTPN)
router.post('/addchitietphieunhaps', MiddlewareController.verifytokenandAdmin, phieuNhapController.addCTPNs)
router.post('/handle-indexform-actions', MiddlewareController.verifytokenandAdmin, phieuNhapController.handleIndexFormActions)
router.delete('/deletectpn', MiddlewareController.verifytokenandAdmin, phieuNhapController.deleteCTPN)
router.patch('/restore/:MaPhieuNhap', MiddlewareController.verifytokenandAdmin, phieuNhapController.restorePhieuNhap)
router.delete('/softDelete/:MaPhieuNhap', MiddlewareController.verifytokenandAdmin, phieuNhapController.softDelete)
router.delete('/destroy/:MaPhieuNhap', MiddlewareController.verifytokenandAdmin, phieuNhapController.destroyPhieuNhap)

module.exports = router
    