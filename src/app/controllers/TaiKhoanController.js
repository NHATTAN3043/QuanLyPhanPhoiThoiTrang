const sequelize = require('../../config/connectDB') // require connection
var initModels = require('../models/init-models')
const { mutipleSequelizeToObject, sequelizeToObject } = require('../../util/sequelize');
var models = initModels(sequelize);
const { cuahangs, phanquyens } = require('../../util/data_select')
const { Op, Sequelize } = require('sequelize');
const removeVietnameseTones = require('../../util/remove_vn')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

class TaiKhoanController {

    // GET /taikhoan/view-login
    async viewLogin(req, res, next) {
        res.render('./taiKhoan/login', { layout: 'login' })
    }
    // POST /taikhoan/login
    async login(req, res, next) {
        try {
            const avaibleEmail = await models.TaiKhoan.findOne({ where: {Email: req.body.Email}})
            if (!avaibleEmail) {
                res.redirect('back')
            }
            const validPass = await bcrypt.compare( req.body.matkhau, avaibleEmail.matkhau)
            if (!validPass) {
                res.redirect('back')
               
            }
            if (avaibleEmail && validPass) {
                const key = jwt.sign({
                    Email: avaibleEmail.Email,
                    MaQuyen: avaibleEmail.MaQuyen,
                },
                process.env.JWT_ACCESS_KEY,
                {expiresIn: "30m"}
                )             
                res.json({key, avaibleEmail})

                // res.redirect('/home')
            }else {
                res.redirect('back')
            }
        } catch (error) {
            next(error)
        }
       

    }

    // GET /taikhoan/index
    async index(req, res, next) {
        try {
            const taikhoans = await models.TaiKhoan.findAll({
                include: [
                    {
                        model: models.CuaHang,
                        as: 'MaCuaHang_CuaHang',
                        required: true,
                    },
                    {
                        model: models.PhanQuyen,
                        as: 'MaQuyen_PhanQuyen',
                        required: true,
                    }
                ]
            })
            res.render('./taiKhoan/index', {
                taikhoans: mutipleSequelizeToObject(taikhoans),
            })
        } catch (error) {
            
        }
    }
    // GET /taikhoan/view-create
    async viewCreate(req, res, next) {
        try {
            const message = req.query.message
            const gioitinh = [{value: 'Nam'}, {value: 'Nữ'}]
            res.render('./taiKhoan/create', {
                gioitinh: gioitinh,
                cuahangs: mutipleSequelizeToObject(await cuahangs()),
                phanquyens: mutipleSequelizeToObject(await phanquyens()),
                message,

            })
        } catch (error) {
            
        }
    }
    // POST /taikhoan/create
    async create(req, res, next) {
        try {
            const salt = await bcrypt.genSalt(10)
            const hashed = await bcrypt.hash(req.body.matkhau, salt)
            req.body.matkhau = hashed
            const avaibleEmail = await models.TaiKhoan.findOne({ where: {Email: req.body.Email}})
            if (avaibleEmail){
                return res.redirect('/taikhoan/view-create?message=emailIsEmpty')
            }
            const taikhoan = await models.TaiKhoan.create(req.body)
            res.redirect('/taikhoan/index')
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
}

module.exports = new TaiKhoanController
