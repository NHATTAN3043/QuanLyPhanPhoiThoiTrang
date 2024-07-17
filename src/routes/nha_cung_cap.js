const express = require('express')
const router = express.Router()

const nhaCungCapController = require('../app/controllers/NhaCungCapController')
const MiddlewareController = require('../app/controllers/MiddlewareController')

router.get('/index',MiddlewareController.verifytokenandAdmin, nhaCungCapController.index)
router.get('/view-create', MiddlewareController.verifytokenandAdmin, nhaCungCapController.viewCreate)
router.post('/create', MiddlewareController.verifytokenandAdmin, nhaCungCapController.create)
router.get('/view-edit/:MaNCC', MiddlewareController.verifytokenandAdmin, nhaCungCapController.viewEdit)
router.put('/edit/:MaNCC', MiddlewareController.verifytokenandAdmin, nhaCungCapController.edit)
router.delete('/delete/:MaNCC', MiddlewareController.verifytokenandAdmin, nhaCungCapController.delete)

module.exports = router
