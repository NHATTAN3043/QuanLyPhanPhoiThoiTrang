const express = require('express')
const router = express.Router()

const mauController = require('../app/controllers/MauController')
const MiddlewareController = require('../app/controllers/MiddlewareController')

router.get('/index',MiddlewareController.verifytokenandAdmin, mauController.index)
router.get('/view-edit/:MaMau',MiddlewareController.verifytokenandAdmin, mauController.viewEdit)
router.put('/edit/:MaMau',MiddlewareController.verifytokenandAdmin, mauController.edit)
router.get('/view-create',MiddlewareController.verifytokenandAdmin, mauController.viewCreate)
router.post('/create',MiddlewareController.verifytokenandAdmin, mauController.create)
router.delete('/delete/:MaMau',MiddlewareController.verifytokenandAdmin, mauController.delete)

module.exports = router
