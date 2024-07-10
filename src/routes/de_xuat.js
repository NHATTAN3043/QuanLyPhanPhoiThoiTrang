const express = require('express')
const router = express.Router()

const deXuatController = require('../app//controllers/DeXuatController')

router.get('/index', deXuatController.index)
router.get('/view-create', deXuatController.viewCreate)
router.get('/details/:MaDeXuat', deXuatController.details)
router.post('/create', deXuatController.create)

module.exports = router;
