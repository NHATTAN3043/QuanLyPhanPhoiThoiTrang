const express = require('express')
const router = express.Router()

const deXuatController = require('../app//controllers/DeXuatController')
const middlewareController = require('../app/controllers/MiddlewareController')

router.get('/index',middlewareController.verifytoken, deXuatController.index)
router.get('/view-create', middlewareController.verifytoken, deXuatController.viewCreate)
router.get('/details/:MaDeXuat', middlewareController.verifytoken, deXuatController.details)
router.get('/view-details/:MaDeXuat', middlewareController.verifytoken, deXuatController.viewDetails)
router.get('/chonsanpham/:MaDeXuat', middlewareController.verifytoken, deXuatController.selectProduct)
router.get('/lydodexuat', middlewareController.verifytoken, deXuatController.proposedReason)
router.get('/chitietdexuat', middlewareController.verifytoken, deXuatController.detailsCTDX)
router.get('/view-editCTDX', middlewareController.verifytoken, deXuatController.viewEditCTDX)
router.post('/create', middlewareController.verifytoken, deXuatController.create)
router.post('/themchitietdexuat', middlewareController.verifytoken, deXuatController.addChiTietDeXuat)
router.patch('/editCTDX', middlewareController.verifytoken, deXuatController.editCTDX)
router.delete('/deleteCTDX', middlewareController.verifytoken, deXuatController.destroyCTDX)
router.delete('/delete/:MaDeXuat', middlewareController.verifytoken, deXuatController.softDelete)


module.exports = router
