const express = require('express')
const router = express.Router()

const duyetDeXuatController = require('../app/controllers/DuyetDeXuatController')

router.get('/index', duyetDeXuatController.index)
router.get('/trash', duyetDeXuatController.trash)
router.get('/view-ctdx/:MaDeXuat', duyetDeXuatController.viewCTDX )
router.get('/view-approvalCTDX', duyetDeXuatController.viewApprovalCTDX)
router.patch('/restore/:MaDeXuat', duyetDeXuatController.restoreDeXuat)
router.patch('/duyet-ctdx', duyetDeXuatController.approvalCTDX)
router.patch('/duyetDX', duyetDeXuatController.approvalDX)
router.delete('/destroy/:MaDeXuat', duyetDeXuatController.destroyDeXuat)
router.delete('/delete/:MaDeXuat', duyetDeXuatController.softDelete)
router.post('/handle-indexform-actions', duyetDeXuatController.handleIndexFormActions)


module.exports = router;