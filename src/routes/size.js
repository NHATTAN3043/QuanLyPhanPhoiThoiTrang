const express = require('express')
const router = express.Router()

const sizeController = require('../app/controllers/SizeController')

router.get('/view-edit/:MaSize',sizeController.viewEdit)
router.put('/edit/:MaSize',sizeController.edit)

module.exports = router;