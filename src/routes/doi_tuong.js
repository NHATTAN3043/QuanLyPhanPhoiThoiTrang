const express = require('express')
const router = express.Router()

const doituongController = require('../app/controllers/DoiTuongController')

router.get('/index', doituongController.index)
router.get('/view-create', doituongController.viewCreate)
router.post('/create',doituongController.create)
router.delete('/delete/:MaDoiTuong', doituongController.delete)
router.get('/view-edit/:MaDoiTuong',doituongController.viewEdit)
router.put('/edit/:MaDoiTuong',doituongController.edit)

module.exports = router;