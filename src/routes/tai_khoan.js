const express = require('express')
const router = express.Router()

const taiKhoanController = require('../app/controllers/TaiKhoanController')

router.get('/view-login', taiKhoanController.viewLogin)
router.get('/index', taiKhoanController.index)
router.get('/view-create', taiKhoanController.viewCreate)
router.post('/create', taiKhoanController.create)
router.post('/login', taiKhoanController.login)

module.exports = router