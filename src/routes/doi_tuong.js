const express = require('express')
const router = express.Router()

const doituongController = require('../app/controllers/DoiTuongController')
const MiddlewareController = require('../app/controllers/MiddlewareController')

router.get('/index', MiddlewareController.verifytokenandAdmin, doituongController.index)
router.get('/view-create', MiddlewareController.verifytokenandAdmin,doituongController.viewCreate)
router.post('/create', MiddlewareController.verifytokenandAdmin,doituongController.create)
router.delete('/delete/:MaDoiTuong', MiddlewareController.verifytokenandAdmin, doituongController.delete)
router.get('/view-edit/:MaDoiTuong', MiddlewareController.verifytokenandAdmin,doituongController.viewEdit)
router.put('/edit/:MaDoiTuong', MiddlewareController.verifytokenandAdmin,doituongController.edit)

module.exports = router;