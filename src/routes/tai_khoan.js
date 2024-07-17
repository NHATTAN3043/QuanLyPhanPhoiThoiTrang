const express = require('express')
const router = express.Router()

const taiKhoanController = require('../app/controllers/TaiKhoanController')
const middlewareController = require('../app/controllers/MiddlewareController')

router.get('/view-login', taiKhoanController.viewLogin)
router.get('/index', middlewareController.verifytokenandAdmin, taiKhoanController.index)
router.get('/view-create', middlewareController.verifytokenandAdmin, taiKhoanController.viewCreate)
router.post('/create', middlewareController.verifytokenandAdmin, taiKhoanController.create)
router.post('/login', taiKhoanController.login)
router.post('/refresh', middlewareController.verifytoken, taiKhoanController.requestRefreshToken)
router.get('/logout', middlewareController.verifytoken, taiKhoanController.logout)
router.get('/view-edit/:MaTK', middlewareController.verifytokenandAdmin, taiKhoanController.viewEdit)
router.put('/edit', middlewareController.verifytokenandAdmin, taiKhoanController.edit)

module.exports = router