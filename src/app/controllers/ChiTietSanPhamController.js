const sequelize = require('../../config/connectDB') // require connection
var initModels = require('../models/init-models')
const { mutipleSequelizeToObject, sequelizeToObject } = require('../../util/sequelize');
var models = initModels(sequelize);
const { sanphams, maus, doituongs, sizes, loaisanphams } = require('../../util/data_select')
const { Op, Sequelize } = require('sequelize');
const removeVietnameseTones = require('../../util/remove_vn')

class ChiTietSanPhamController {
    // GET /ctsp/index
    async index(req, res, next) {
        try {
            const searchConditions = req.query
            let whereConditions = []
            let includeConditions = []
            var searchQuery=''
            const page = parseInt(req.query.page) || 1
            const limit = 6
            const offset = (page - 1) * limit
            // count chitietsanpham
            const countAllctsp = await models.ChiTietSanPham.count({})
            // chia trang
            const totalPages = Math.ceil(countAllctsp / limit)
            // filter conditions 
            if (Object.keys(searchConditions).length != 0) {
               if (searchConditions.MaSize) {
                    whereConditions.push({MaSize: searchConditions.MaSize})
               }
               if (searchConditions.MaMau) {
                    whereConditions.push({MaMau: searchConditions.MaMau})
               }
               if (searchConditions.MaLoai) {
                    whereConditions.push({MaLoaiSanPham: searchConditions.MaLoai})
               }
               if (searchConditions.MaDoiTuong) {
                    whereConditions.push({MaDoiTuong: searchConditions.MaDoiTuong})
                }
                if (searchConditions.searchText) {
                    searchQuery = removeVietnameseTones(searchConditions.searchText)                                  
                    includeConditions.push(
                        {
                            model: models.Size,
                            as: 'MaSize_Size',
                            required: true,                                               
                        },
                        {
                            model: models.Mau,
                            as: 'MaMau_Mau',
                            required: true,                                                
                        },
                        {
                            model: models.LoaiSanPham,
                            as: 'MaLoaiSanPham_LoaiSanPham',
                            required: true,                 
                        },
                        {
                            model: models.DoiTuong,
                            as: 'MaDoiTuong_DoiTuong',
                            required: true,                          
                        },
                        {
                            model: models.Sanpham,
                            as: 'MaSanPham_SanPham',
                            require: true,
                            where:               
                            {
                                TenSanPham: {
                                    [Op.like]: `%${searchQuery}%`
                                }
                            }
                        }
                    )             
                }
            }
            const ctsps = await models.ChiTietSanPham.findAll({
                where: {
                    [Op.and]: whereConditions,
                },
                include: includeConditions.length > 0 ? includeConditions : [
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
                        required: true,                      
                    },
                    {
                        model: models.DoiTuong,
                        as: 'MaDoiTuong_DoiTuong',
                        required: true
                    },
                    {
                        model: models.Sanpham,
                        as: 'MaSanPham_SanPham',
                        require: true,
                    }
                ],
                limit: limit,
                offset: offset,
            })
               
            res.render('./chiTietSanPham/index', {
                ctsps: mutipleSequelizeToObject(ctsps),
                sizes:  mutipleSequelizeToObject(await sizes()),
                maus:  mutipleSequelizeToObject(await maus()),
                loais:  mutipleSequelizeToObject(await loaisanphams()),
                doituongs:  mutipleSequelizeToObject(await doituongs()),
                originalTextSearch: searchConditions.searchText, 
                currentPage: page,
                totalPages,           
                maQuyen: req.user.MaQuyen,
            })              
        } catch (error) {
            console.log(error)
            next(error)
        }
        
    }
     // GET /doituong/view-create
     async viewCreate(req, res, next) {
        res.render('./chiTietSanPham/create', {
            sanphams: mutipleSequelizeToObject(await sanphams()),
            sizes: mutipleSequelizeToObject(await sizes()),
            maus: mutipleSequelizeToObject(await maus()),
            loaisanphams: mutipleSequelizeToObject(await loaisanphams()),
            doituongs: mutipleSequelizeToObject(await doituongs()),
            maQuyen: req.user.MaQuyen,
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
                MaChiTietSanPham: req.params.MaChiTietSanPham
            }
        })
        res.render('./chiTietSanPham/edit', {
            chiTietSanPham: sequelizeToObject(chiTietSanPham),
            sanphams: mutipleSequelizeToObject(await sanphams()),
            sizes: mutipleSequelizeToObject(await sizes()),
            maus: mutipleSequelizeToObject(await maus()),
            loaisanphams: mutipleSequelizeToObject(await loaisanphams()),
            doituongs: mutipleSequelizeToObject(await doituongs()),
            maQuyen: req.user.MaQuyen,
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
            maQuyen: req.user.MaQuyen,
        })
    }
}   

module.exports = new ChiTietSanPhamController
