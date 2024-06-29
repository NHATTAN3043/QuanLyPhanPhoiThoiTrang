const express = require('express')
const router = express.Router()

const nhaCungCapController = require('../app/controllers/NhaCungCapController')

router.get('/index', nhaCungCapController.index)
router.get('/view-create', nhaCungCapController.viewCreate)
router.post('/create', nhaCungCapController.create)
router.get('/view-edit/:MaNCC', nhaCungCapController.viewEdit)
router.put('/edit/:MaNCC', nhaCungCapController.edit)
router.delete('/delete/:MaNCC', nhaCungCapController.delete)

module.exports = router
