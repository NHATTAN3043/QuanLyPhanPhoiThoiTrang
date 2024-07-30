const sequelize = require('../../config/connectDB') // require connection
var initModels = require('../models/init-models')
const { mutipleSequelizeToObject, sequelizeToObject } = require('../../util/sequelize');
var models = initModels(sequelize);
const { cuahangs, phanquyens } = require('../../util/data_select')
const { Op, Sequelize } = require('sequelize');
const removeVietnameseTones = require('../../util/remove_vn')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const findUserByToken = require('../../util/findUserByToken')
const { generateAccessToken, generateRefreshToken } = require('../../util/generate_token')
require('dotenv').config()

class TaiKhoanController {

    // GET /taikhoan/view-login
    async viewLogin(req, res, next) {
        res.render('./taiKhoan/login',{
            layout: 'login',
            })
    }
    // POST /taikhoan/login
    async login(req, res, next) {
        try {
            const avaibleUser = await models.TaiKhoan.findOne({ where: {Email: req.body.Email}})
            if (!avaibleUser) {
                return res.redirect('back')
            }
            const validPass = await bcrypt.compare( req.body.matkhau, avaibleUser.matkhau)
            if (!validPass) {
                return res.redirect('back')
               
            }
            if (avaibleUser && validPass) {
                const accessToken = generateAccessToken(avaibleUser)
                const refreshToken = generateRefreshToken(avaibleUser)
                // hash and store refreshToken into db
                const salt = await bcrypt.genSalt(10)
                const hashed = await bcrypt.hash(refreshToken, salt)
                await models.TaiKhoan.update(
                    { RefreshToken: hashed },
                    {
                      where: {
                        Email: avaibleUser.Email,
                      },
                    },
                  )

                // store refreshToken into cookie
                res.cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    secure: false,
                    path: "/",
                    sameSite: "strict",
                } )
                // Lưu accessToken vào cookie
                res.cookie("accessToken", accessToken, {
                    httpOnly: false, // Cho truy cập từ JavaScript
                    secure: false, // Thay đổi thành true nếu bạn sử dụng HTTPS
                    path: "/",
                    sameSite: "strict",
                });
                // return res.json({ accessToken, avaibleUser })
                res.redirect(`/home`)
            }else {
                return res.redirect('back')
            }
        } catch (error) {
            next(error)
        }     
    }
    // GET /taikhoan/logout
    async logout(req, res, next) {
        res.clearCookie("accessToken")
        res.clearCookie("refreshToken")
        const userToken = await findUserByToken(req.cookies.refreshToken)
        if (userToken) {
            // delete old token        
            await models.TaiKhoan.update(
                { RefreshToken: '' },
                {
                    where: {
                    Email: userToken.Email,
                    },
                },
            )  
        }
        res.redirect('/taikhoan/view-login')
    }
    // Refresh token
    async requestRefreshToken(req, res, next) {
        // take token from client
        const refreshToken = req.cookies.refreshToken
        if (!refreshToken) return res.status(401).json("You are not authenticated")
        const userToken = await findUserByToken(refreshToken)
        if (!userToken) {
            return res.status(403).json("Refresh token is not valid!")
        }
        jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, async (err, user) => {
            if (err) {
                return res.json({Error: "Invalid token!"})
            }
            // delete old token        
            await models.TaiKhoan.update(
                { RefreshToken: '' },
                {
                    where: {
                    Email: user.Email,
                    },
                },
            )         
            // create new accessToken, refreshToken 
            const newAccessToken = generateAccessToken(user)
            const newRefreshToken = generateRefreshToken(user)
            // add token into db
            const salt = await bcrypt.genSalt(10)
            const hashed = await bcrypt.hash(newRefreshToken, salt)
            await models.TaiKhoan.update(
                { RefreshToken: hashed },
                {
                    where: {
                    Email: user.Email,
                    },
                },
                )
             // store refreshToken into cookie
             res.cookie("refreshToken", newRefreshToken, {
                httpOnly: true,
                secure: false,
                path: "/",
                sameSite: "strict",
            })
            // store newAccessToken into cookie
            res.cookie("accessToken", newAccessToken, {
                httpOnly: false,
                secure: false,
                path: "/",
                sameSite: "strict",
            })
            res.status(200).json({accessToken: newAccessToken})
           
        })
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
                maQuyen: req.user.MaQuyen,
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
                maQuyen: req.user.MaQuyen,

            })
        } catch (error) {
            next(error)
        }
    }
    // POST /taikhoan/create
    async create(req, res, next) {
        try {
            const file = req.cloudinaryFile
            req.body.HinhAnh = file.path
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
    // GET /taikhoan/view-edit/:MaTK
    async viewEdit(req, res, next) {
        try {
            const account = await models.TaiKhoan.findOne({
                where: {
                    MaTK: req.params.MaTK
                },
                include: [
                    {
                        model: models.PhanQuyen,
                        as: 'MaQuyen_PhanQuyen',
                        required: true,
                    },
                    {
                        model: models.CuaHang,
                        as: 'MaCuaHang_CuaHang',
                        required: true,
                    }
                ]
            })
            const gioitinh = [{value: 'Nam'}, {value: 'Nữ'}]
            res.render('./taiKhoan/edit', {
                account: sequelizeToObject(account),
                cuahangs: mutipleSequelizeToObject(await cuahangs()),
                phanquyens: mutipleSequelizeToObject(await phanquyens()),
                gioitinh: gioitinh,
                maQuyen: req.user.MaQuyen,
            })
        } catch (error) {
            next(error)
        }
    }
    // PUT /taikhoan/edit
    async edit(req, res, next) {
        try {
            await models.TaiKhoan.update(req.body, {
                where: {
                    MaTK: req.body.MaTK,
                }
            })            
            res.redirect('/taikhoan/index')
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new TaiKhoanController
