const sequelize = require('../../config/connectDB') // require connection
var initModels = require('../models/init-models')
const { mutipleSequelizeToObject, sequelizeToObject } = require('../../util/sequelize');
var models = initModels(sequelize);

class ChiTietSanPhamController {
    // GET /ctsp/index
    index(req, res, next) {
        models.ChiTietSanPham.findAll({
            include: [
                {
                    model: models.Size,
                    as: 'MaSize_Size',
                    required: true
                },
                {
                    model: models.Mau,
                    as: 'MaMau_Mau',
                    required: true
                },
                {
                    model: models.LoaiSanPham,
                    as: 'MaLoaiSanPham_LoaiSanPham',
                    required: true
                },
                {
                    model: models.DoiTuong,
                    as: 'MaDoiTuong_DoiTuong',
                    required: true
                },
                {
                    model: models.Sanpham,
                    as: 'MaSanPham_SanPham',
                    require: true
                }
            ]
        })
            .then((ctsps) => {
                res.render('./chiTietSanPham/index', {
                    ctsps: mutipleSequelizeToObject(ctsps)               
                })
            }).catch((error) => {
                next(error)
            })
    }
     // GET /doituong/view-create
     async viewCreate(req, res, next) {
        const sanphams = await models.Sanpham.findAll({})
        const sizes = await models.Size.findAll({})
        const maus = await models.Mau.findAll({})
        const loaisanphams = await models.LoaiSanPham.findAll({})
        const doituongs = await models.DoiTuong.findAll({})

        res.render('./chiTietSanPham/create', {
            sanphams: mutipleSequelizeToObject(sanphams),
            sizes: mutipleSequelizeToObject(sizes),
            maus: mutipleSequelizeToObject(maus),
            loaisanphams: mutipleSequelizeToObject(loaisanphams),
            doituongs: mutipleSequelizeToObject(doituongs),

        })
    }
    // POST /ctsp/create
    async create(req, res, next) {
        await models.ChiTietSanPham.create(req.body)
            .then(() => {
                res.redirect('/ctsp/index')
            }).catch((error) => {
                next(error)
            })
    }
    // GET /ctsp/view-edit/:MaChiTietSanPham
    async viewEdit(req, res, next) {
        const MaCTSP = req.params.MaChiTietSanPham
        const chiTietSanPham = await models.ChiTietSanPham.findOne({
            include: [
                {
                    model: models.Size,
                    as: 'MaSize_Size',
                    required: true
                },
                {
                    model: models.Mau,
                    as: 'MaMau_Mau',
                    required: true
                },
                {
                    model: models.LoaiSanPham,
                    as: 'MaLoaiSanPham_LoaiSanPham',
                    required: true
                },
                {
                    model: models.DoiTuong,
                    as: 'MaDoiTuong_DoiTuong',
                    required: true
                },
                {
                    model: models.Sanpham,
                    as: 'MaSanPham_SanPham',
                    require: true
                }
            ],
            where: {
                MaChiTietSanPham: MaCTSP
            }
        })
        const sanphams = await models.Sanpham.findAll({})
        const sizes = await models.Size.findAll({})
        const maus = await models.Mau.findAll({})
        const loaisanphams = await models.LoaiSanPham.findAll({})
        const doituongs = await models.DoiTuong.findAll({})
        res.render('./chiTietSanPham/edit', {
            chiTietSanPham: sequelizeToObject(chiTietSanPham),
            sanphams: mutipleSequelizeToObject(sanphams),
            sizes: mutipleSequelizeToObject(sizes),
            maus: mutipleSequelizeToObject(maus),
            loaisanphams: mutipleSequelizeToObject(loaisanphams),
            doituongs: mutipleSequelizeToObject(doituongs),
        })
    }
    // PUT /ctsp/edit/:MaChiTietSanPham
    async edit(req, res, next) {
        const maCTSP = req.params.MaChiTietSanPham
        try {
            await models.ChiTietSanPham.update(req.body, {
                where: { MaChiTietSanPham: maCTSP}
            })
            res.redirect('/ctsp/index')

        } catch (error) {
            next(error)
        }
    }
    // DELETE /ctsp/delete/:MaChiTietSanPham
    async delete(req, res, next) {   
        await models.ChiTietSanPham.destroy({
            where: {
                MaChiTietSanPham: req.params.MaChiTietSanPham
            },
            force: true
        }).then(() => {
            res.redirect('/ctsp/index')
        }).catch((error) => {
            next(error)
            console.log('MESSEGE: DELETE CTSP ERROR!')
        })
   
    }
    // GET ctsp/detail/:MaChiTietSanPham
    async detail(req, res, next) {
        const MaCTSP = req.params.MaChiTietSanPham
        const chiTietSanPham = await models.ChiTietSanPham.findOne({
            include: [
                {
                    model: models.Size,
                    as: 'MaSize_Size',
                    required: true
                },
                {
                    model: models.Mau,
                    as: 'MaMau_Mau',
                    required: true
                },
                {
                    model: models.LoaiSanPham,
                    as: 'MaLoaiSanPham_LoaiSanPham',
                    required: true
                },
                {
                    model: models.DoiTuong,
                    as: 'MaDoiTuong_DoiTuong',
                    required: true
                },
                {
                    model: models.Sanpham,
                    as: 'MaSanPham_SanPham',
                    require: true
                }
            ],
            where: {
                MaChiTietSanPham: MaCTSP
            }
        })
        res.render('./chiTietSanPham/detail', {
            chiTietSanPham: sequelizeToObject(chiTietSanPham),           
        })
    }
}   

module.exports = new ChiTietSanPhamController
