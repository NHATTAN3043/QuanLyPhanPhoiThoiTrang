const express = require('express')
const router = express.Router()

const sizeController = require('../app/controllers/SizeController')

router.get('/index', sizeController.index)
router.get('/view-create', sizeController.viewCreate)
router.post('/create',sizeController.create)
router.delete('/delete/:MaSize', sizeController.delete)
router.get('/view-edit/:MaSize',sizeController.viewEdit)
router.put('/edit/:MaSize',sizeController.edit)

module.exports = router;