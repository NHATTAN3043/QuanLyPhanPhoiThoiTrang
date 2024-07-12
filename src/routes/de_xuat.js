const express = require('express')
const router = express.Router()

const deXuatController = require('../app//controllers/DeXuatController')

router.get('/index', deXuatController.index)
router.get('/view-create', deXuatController.viewCreate)
router.get('/details/:MaDeXuat', deXuatController.details)
router.get('/view-details/:MaDeXuat', deXuatController.viewDetails)
router.get('/chonsanpham/:MaDeXuat', deXuatController.selectProduct)
router.get('/lydodexuat', deXuatController.proposedReason)
router.get('/chitietdexuat', deXuatController.detailsCTDX)
router.get('/view-editCTDX', deXuatController.viewEditCTDX)
router.post('/create', deXuatController.create)
router.post('/themchitietdexuat', deXuatController.addChiTietDeXuat)
router.patch('/editCTDX', deXuatController.editCTDX)
router.delete('/deleteCTDX', deXuatController.destroyCTDX)
router.delete('/delete/:MaDeXuat', deXuatController.softDelete)


module.exports = router;
