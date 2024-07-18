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
        const searchConditions = req.query
        const user = await models.TaiKhoan.findOne({where: {[Op.and] : [{Email: req.user.Email},{MaQuyen: 2}]}})
        let whereConditions = []  
        const page = parseInt(req.query.page) || 1
        const limit = 6
        const offset = (page - 1) * limit
        try {    
            if (user) {
                whereConditions.push({MaCuaHang: user.MaCuaHang})
            }     
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
                order: [['createdAt', 'DESC']],
                limit: limit,
                offset: offset,
            })
            res.render('./deXuat/index', {
                dexuats: mutipleSequelizeToObject(dexuats),
                cuahangs: mutipleSequelizeToObject(await cuahangs()),
                trangThai: trangThai,
                originalTextSearch: req.query.searchdocs,
                currentPage: page,
                totalPages,
                maQuyen: req.user.MaQuyen,
            })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
    // GET /dexuat/view-create
    async viewCreate(req, res, next) {
        try {
            const user = await models.TaiKhoan.findOne({where: {Email: req.user.Email}}) 
            res.render('./deXuat/create', {
                cuahangs: mutipleSequelizeToObject(await cuahangs()),
                MaCuaHang: user.MaCuaHang,
                maQuyen: req.user.MaQuyen,
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
    // DELETE /dexuat/delete/:MaDeXuat
    async softDelete(req, res, next) {
        try {
            await models.DeXuat.destroy({
                where: {
                    MaDeXuat: req.params.MaDeXuat
                }
            })
            res.redirect('back')
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
    // GET /dexuat/details/:MaDeXuat
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
            res.render('./deXuat/details', {
                deXuat: sequelizeToObject(deXuat),
                cuaHangDX: sequelizeToObject(cuaHangDX),
                chitietdexuats: mutipleSequelizeToObject(chitietdexuats),
                maQuyen: req.user.MaQuyen,
            })
        } catch (error) {
            next(error)
        }
    }
    // GET /dexuat/view-details/:MaDeXuat
    async viewDetails(req, res, next) {
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
            res.render('./deXuat/viewDetails', {
                deXuat: sequelizeToObject(deXuat),
                cuaHangDX: sequelizeToObject(cuaHangDX),
                chitietdexuats: mutipleSequelizeToObject(chitietdexuats),
                maQuyen: req.user.MaQuyen,
            })
        } catch (error) {
            next(error)
        }
    }
    // GET /dexuat/chonsanpham/:MaDeXuat
    async selectProduct(req, res, next) {
        const message = req.query.message
        const MaDX = req.params.MaDeXuat
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
    // conditions filter
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
        models.ChiTietSanPham.findAll({
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
            limit: limit,
            offset: offset,
        }).then( async (listProduct) => {
            res.render('./deXuat/selectProduct', {
                listProduct: mutipleSequelizeToObject(listProduct),
                sizes:  mutipleSequelizeToObject(await sizes()),
                maus:  mutipleSequelizeToObject(await maus()),
                loais:  mutipleSequelizeToObject(await loaisanphams()),
                doituongs:  mutipleSequelizeToObject(await doituongs()),
                originalTextSearch: searchConditions.searchText,
                MaDX: MaDX,
                currentPage: page,
                totalPages,
                message: message,   
                maQuyen: req.user.MaQuyen,
            })
        }).catch((error) => {
            next(error)
        })
    }
    // GET /dexuat/lydodexuat
    async proposedReason(req, res, next) {
        try {
            const MaDeXuat = req.query.MaDeXuat
            const MaChiTietSanPham = req.query.MaChiTietSanPham
            const CTSP = await models.ChiTietSanPham.findOne({
                where: { MaChiTietSanPham: MaChiTietSanPham},
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
            res.render('./deXuat/proposedReason', {
                MaDeXuat: MaDeXuat,
                MaChiTietSanPham: MaChiTietSanPham,
                CTSP: sequelizeToObject(CTSP),
                maQuyen: req.user.MaQuyen,
            })
        } catch (error) {
            next(error)
        }
    }
    // POST /dexuat/themchitietdexuat
    async addChiTietDeXuat(req, res, next) {
        try {
            const availableCTDX = await models.ChiTietDeXuat.findOne({
                where: {
                    MaChiTietSanPham: req.body.MaChiTietSanPham,
                    MaDeXuat: req.body.MaDeXuat,
                }
            })
            if(!availableCTDX) {
                const ctdx = await models.ChiTietDeXuat.create(req.body)
                res.redirect(`/dexuat/details/${ctdx.MaDeXuat}`)
            }else{
                res.redirect(`/dexuat/chonsanpham/${req.body.MaDeXuat}?message=You had chossen the product!`)                                   
            }

        } catch (error) {
            console.log(error)
            next(error)
        }
    }
    // GET /dexuat/chitietdexuat
    async detailsCTDX(req, res, next) {
        try {
            const CTDX = await models.ChiTietDeXuat.findOne({
                where: {
                    MaDeXuat: req.query.MaDeXuat,
                    MaChiTietSanPham: req.query.MaChiTietSanPham,
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
            res.render('./deXuat/detailsCTDX', {
                CTDX: sequelizeToObject(CTDX),
                maQuyen: req.user.MaQuyen,
            })
        } catch (error) {
            next(error)
        }
      
    }
    // GET /dexuat/view-editCTDX
    async viewEditCTDX(req, res, next) {
        try {
            const CTDX = await models.ChiTietDeXuat.findOne({
                where: {
                    MaDeXuat: req.query.MaDeXuat,
                    MaChiTietSanPham: req.query.MaChiTietSanPham,
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
            res.render('./deXuat/editCTDX', {
                CTDX: sequelizeToObject(CTDX),
                maQuyen: req.user.MaQuyen,
            })
        } catch (error) {
            next(error)
        }
    }
    // PATCH /dexuat/editCTDX
    async editCTDX(req, res, next) {
        const { MaDeXuat, MaChiTietSanPham, LyDoDeXuat, SoLuongDeXuat } = req.body
        if (!MaDeXuat || !MaChiTietSanPham) {
            res.status(400).json({ error: 'Primary keys are required' })
        }
        else{
            try {
                const CTDXedit = await models.ChiTietDeXuat.update(
                    {   LyDoDeXuat: LyDoDeXuat,
                        SoLuongDeXuat: SoLuongDeXuat
                    },
                    {
                        where: {
                            MaDeXuat: MaDeXuat,
                            MaChiTietSanPham: MaChiTietSanPham,
                        },
                    }
                )
                res.redirect(`/dexuat/details/${MaDeXuat}`)
            } catch (error) {             
                console.log(error)  
                next(error)
            }
        }
    }
    // DELETE /dexuat/deleteCTDX
    async destroyCTDX(req, res, next) {
        try {
            const CTDXdelete = await models.ChiTietDeXuat.destroy({
                where: {
                    MaDeXuat: req.body.MaDeXuat,
                    MaChiTietSanPham: req.body.MaChiTietSanPham,
                }
            })
            res.redirect('back')
        } catch (error) {
            next(error)
        } 
    }
}

module.exports = new DeXuatController
