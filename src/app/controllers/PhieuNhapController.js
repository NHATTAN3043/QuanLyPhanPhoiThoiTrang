const sequelize = require('../../config/connectDB') // require connection
var initModels = require('../models/init-models')
const { mutipleSequelizeToObject, sequelizeToObject } = require('../../util/sequelize');
const { DATE } = require('sequelize');
var models = initModels(sequelize);

class PhieuNhapController {
    // GET phieunhap/index
    async index(req, res, next) {
        await models.PhieuNhap.findAll({
            include: [
                {
                    model: models.NhaCungCap,
                    as: 'MaNCC_NhaCungCap',
                    required: true
                },
            ],
            order: [['NgayNhapHang', 'DESC']]
        }).then((phieunhaps) => {
            res.render('./phieuNhap/index', {
                phieunhaps: mutipleSequelizeToObject(phieunhaps)
            })
        }).catch((error) => {
            next(error)
        })
            
    }
    // GET /phieunhap/view-create
    async viewCreate(req, res, next) {
        const nhacungcaps = await models.NhaCungCap.findAll({}) 
        res.render('./phieuNhap/create', {
            nhacungcaps: mutipleSequelizeToObject(nhacungcaps)
        })
    }
    // POST /phieunhap/create
    async create(req, res, next) {
        try {
            // const currentTime = Date.now()
            // req.body.NgayNhapHang = currentTime
            const phieuNhap = await models.PhieuNhap.create(req.body)
            const maPN = phieuNhap.MaPhieuNhap
            res.redirect(`/phieuNhap/details/${maPN}`)
        } catch (error) {
            
        }
    }
    // GET /phieunhap/details/:MaPhieuNhap
    async details(req, res, next) {
        const phieuNhap = await models.PhieuNhap.findByPk(req.params.MaPhieuNhap)
        res.render('./phieuNhap/details', {
            phieuNhap: sequelizeToObject(phieuNhap)
        })
    }
}

module.exports = new PhieuNhapController
