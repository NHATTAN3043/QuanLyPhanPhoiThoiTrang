const express = require('express')
const router = express.Router()

const duyetDeXuatController = require('../app/controllers/DuyetDeXuatController')
const MiddlewareController = require('../app/controllers/MiddlewareController')

router.get('/index', MiddlewareController.verifytokenandAdmin, duyetDeXuatController.index)
router.get('/trash', MiddlewareController.verifytokenandAdmin, duyetDeXuatController.trash)
router.get('/view-ctdx/:MaDeXuat', MiddlewareController.verifytokenandAdmin, duyetDeXuatController.viewCTDX )
router.get('/view-approvalCTDX', MiddlewareController.verifytokenandAdmin, duyetDeXuatController.viewApprovalCTDX)
router.patch('/restore/:MaDeXuat', MiddlewareController.verifytokenandAdmin, duyetDeXuatController.restoreDeXuat)
router.patch('/duyet-ctdx', MiddlewareController.verifytokenandAdmin, duyetDeXuatController.approvalCTDX)
router.patch('/duyetDX', MiddlewareController.verifytokenandAdmin, duyetDeXuatController.approvalDX)
router.delete('/destroy/:MaDeXuat', MiddlewareController.verifytokenandAdmin, duyetDeXuatController.destroyDeXuat)
router.delete('/delete/:MaDeXuat', MiddlewareController.verifytokenandAdmin, duyetDeXuatController.softDelete)
router.post('/handle-indexform-actions', MiddlewareController.verifytokenandAdmin, duyetDeXuatController.handleIndexFormActions)


module.exports = router;