const sequelize = require('../../config/connectDB') // require connection
var initModels = require('../models/init-models')
const { mutipleSequelizeToObject, sequelizeToObject } = require('../../util/sequelize');
var models = initModels(sequelize);
const { sanphams, maus, doituongs, sizes, loaisanphams, cuahangs } = require('../../util/data_select')
const { Op, Sequelize } = require('sequelize');
const removeVietnameseTones = require('../../util/remove_vn')

class VanChuyenController {
    // GET /vanchuyen/index
    async index(req, res, next) {
        const page = parseInt(req.query.page) || 1
        const limit = 6
        const offset = (page - 1) * limit
        const searchConditions = req.query
        let whereConditions = [{TrangThai: { [Op.notLike]: 'Chờ duyệt'}}]            
        try {
            // count chitietsanpham
            const countAlldx = await models.DeXuat.count({})
            // chia trang
            const totalPages = Math.ceil(countAlldx / limit)
            // filter conditions        
            if (Object.keys(searchConditions).length != 0) {
                if (searchConditions.searchdocs) {
                    var searchTieude = removeVietnameseTones(searchConditions.searchdocs)
                    whereConditions.push({Tieude: {
                        [Op.like] : `%${searchTieude}%`
                    }})
                }
                if (searchConditions.TrangThai) {
                    whereConditions.push({TrangThai: searchConditions.TrangThai})
                }
                if (searchConditions.MaCuaHang) {
                    whereConditions.push({MaCuaHang: searchConditions.MaCuaHang})
                }
            }
            // count phieunhap in trash
            const countDeleted = await models.DeXuat.count({
                where: {
                    deletedAt: {
                      [Sequelize.Op.not]: null
                    }
                  },
                  paranoid: false,
            })
            // data select list
            const trangThai = [            
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
            // count elemnet DeXuat had deleted
            const dexuats = await models.DeXuat.findAll({  
                where: {
                    [Op.and]: whereConditions,
                },            
                include: [
                    {
                        model: models.CuaHang,
                        as: 'MaCuaHang_CuaHang',
                        required: true,
                    }

                ],
                order: [['updatedAt', 'DESC']],
                limit: limit,
                offset: offset,
            })
            res.render('./vanChuyen/index', {
                dexuats: mutipleSequelizeToObject(dexuats),
                cuahangs: mutipleSequelizeToObject(await cuahangs()),
                trangThai: trangThai, 
                count: countDeleted, 
                originalTextSearch: req.query.searchdocs, 
                currentPage: page,
                totalPages,         
            })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
    // GET /vanchuyen/details/:MaDeXuat
    async details(req, res, next) {
        try {
            const maDeXuat = req.params.MaDeXuat
            const deXuat = await models.DeXuat.findByPk(maDeXuat)
            const cuaHangDX = await models.CuaHang.findByPk(deXuat.MaCuaHang)
            const chitietdexuats = await models.ChiTietDeXuat.findAll({
                where: {
                    MaDeXuat: maDeXuat,               
                },
                include: [
                    {
                        model: models.ChiTietSanPham,
                        as: 'MaChiTietSanPham_ChiTietSanPham',
                        required: true,
                        include: [
                            {
                                model: models.Size,
                                as:"MaSize_Size",                          
                                required: true,
                            },
                            {
                                model: models.Sanpham,
                                as: "MaSanPham_SanPham",
                                required: true,
                            },
                            {
                                model: models.Mau,
                                as: "MaMau_Mau",
                                required: true,
                            },
                            {
                                model: models.LoaiSanPham,
                                as: "MaLoaiSanPham_LoaiSanPham",
                                required: true,
                            },
                            {
                                model: models.DoiTuong,
                                as: "MaDoiTuong_DoiTuong",
                                required: true,
                            }
                        ]                             
                    }
                ]
            })
            let i = 0
            const totalAmount = chitietdexuats.map((ctdx) => {
                i += ctdx.SoLuongDuyet              
            })
            res.render('./vanChuyen/details', {
                deXuat: sequelizeToObject(deXuat),
                cuaHangDX: sequelizeToObject(cuaHangDX),
                chitietdexuats: mutipleSequelizeToObject(chitietdexuats),
                totalAmount: i,
            })
        } catch (error) {
            next(error)
        }
    }
    // PATCH /vanchuyen/xacnhanvanchuyen/:action
    async actionDelivery(req, res, next) {
        const action = req.params.action
        const MaDX = req.body.MaDeXuat
        switch (action) {
            case 'xnvc':
                try {
                    const CTDX = await models.DeXuat.update(
                        {
                            TrangThai: 'Xác nhận vận chuyển'
                        },
                        {
                            where: {
                                MaDeXuat: MaDX,
                            }
                        }
                    )
                    res.redirect('/vanchuyen/index')
                } catch (error) {
                    console.log(error)
                    res.redirect('back')
                }
                break;
            case 'dvc':
                try {
                    const CTDX = await models.DeXuat.update(
                        {
                            TrangThai: 'Đã vận chuyển'
                        },
                        {
                            where: {
                                MaDeXuat: MaDX,
                            }
                        }
                    )
                    res.redirect('/vanchuyen/index')
                } catch (error) {
                    console.log(error)
                    res.redirect('back')
                }
                break;
            default: res.json({messge: "Action is not found!"})
                break;
        }
    }
}

module.exports = new VanChuyenController
