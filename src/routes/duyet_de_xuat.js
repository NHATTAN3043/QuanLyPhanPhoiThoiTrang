const express = require('express')
const router = express.Router()

const duyetDeXuatController = require('../app/controllers/DuyetDeXuatController')

router.get('/index', duyetDeXuatController.index)
router.get('/trash', duyetDeXuatController.trash)
router.delete('/delete/:MaDeXuat', duyetDeXuatController.softDelete)
router.patch('/restore/:MaDeXuat', duyetDeXuatController.restoreDeXuat)
router.delete('/destroy/:MaDeXuat', duyetDeXuatController.destroyDeXuat)
router.post('/handle-indexform-actions', duyetDeXuatController.handleIndexFormActions)


module.exports = router;