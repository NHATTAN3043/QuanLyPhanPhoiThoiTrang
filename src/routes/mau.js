const express = require('express')
const router = express.Router()

const mauController = require('../app/controllers/MauController')

router.get('/index', mauController.index)
router.get('/view-edit/:MaMau', mauController.viewEdit)
router.put('/edit/:MaMau', mauController.edit)
router.get('/view-create', mauController.viewCreate)
router.post('/create', mauController.create)
router.delete('/delete/:MaMau', mauController.delete)

module.exports = router
