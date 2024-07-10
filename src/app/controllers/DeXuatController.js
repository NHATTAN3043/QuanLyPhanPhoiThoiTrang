const sequelize = require('../../config/connectDB') // require connection
var initModels = require('../models/init-models')
const { mutipleSequelizeToObject, sequelizeToObject } = require('../../util/sequelize');
var models = initModels(sequelize);
const { sanphams, maus, doituongs, sizes, loaisanphams, cuahangs } = require('../../util/data_select')
const { Op, Sequelize } = require('sequelize');
const removeVietnameseTones = require('../../util/remove_vn')

class DeXuatController {
    // GET /dexuat/index
    async index(req, res, next) {
        try {
            const trangThai = [
                {
                    text: 'Chờ duyệt',
                    value: 'Chờ duyệt',
                },
                {
                    text: 'Đã duyệt',
                    value: 'Đã duyệt',
                },
                {
                    text: 'Xác nhận vận chuyển',
                    value: 'Xác nhận VC',
                },
                {
                    text: 'Đã vận chuyển',
                    value: 'Đã vận chuyển',
                }
            ]   
            const dexuats = await models.DeXuat.findAll({
                include: [
                    {
                        model: models.CuaHang,
                        as: 'MaCuaHang_CuaHang',
                        required: true,
                    }

                ]
            })
            res.render('./deXuat/index', {
                dexuats: mutipleSequelizeToObject(dexuats),
                cuahangs: mutipleSequelizeToObject(await cuahangs()),
                trangThai: trangThai,
            })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
    // GET /dexuat/view-create
    async viewCreate(req, res, next) {
        try {
            res.render('./deXuat/create', {
                cuahangs: mutipleSequelizeToObject(await cuahangs())
            })
        } catch (error) {
            next(error)
        }
    }
    // POST /dexuat/create
    async create(req, res, next) {
        try {
            const deXuat = await models.DeXuat.create(req.body)
            res.redirect(`/dexuat/details/${deXuat.MaDeXuat}`)
        } catch (error) {
            console.log('ERROR CREATE DEXUAT!')
            next(error)
        }
    }
    // GET /dexuat/details/:MaDeXuat
    async details(req, res, next) {
        try {
            const maDeXuat = req.params.MaDeXuat
            const deXuat = await models.DeXuat.findByPk(maDeXuat)
            const cuaHangDX = await models.CuaHang.findByPk(deXuat.MaCuaHang)
            res.render('./deXuat/details', {
                deXuat: sequelizeToObject(deXuat),
                cuaHangDX: sequelizeToObject(cuaHangDX),
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new DeXuatController
