const express = require('express')
const router = express.Router()

const sizeController = require('../app/controllers/SizeController')
const MiddlewareController = require('../app/controllers/MiddlewareController')

router.get('/index', MiddlewareController.verifytokenandAdmin, sizeController.index)
router.get('/view-create',MiddlewareController.verifytokenandAdmin , sizeController.viewCreate)
router.post('/create',MiddlewareController.verifytokenandAdmin , sizeController.create)
router.delete('/delete/:MaSize',MiddlewareController.verifytokenandAdmin , sizeController.delete)
router.get('/view-edit/:MaSize',MiddlewareController.verifytokenandAdmin ,sizeController.viewEdit)
router.put('/edit/:MaSize',MiddlewareController.verifytokenandAdmin ,sizeController.edit)

module.exports = router;