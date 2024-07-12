const sequelize = require('../../config/connectDB') // require connection
var initModels = require('../models/init-models')
const { mutipleSequelizeToObject, sequelizeToObject } = require('../../util/sequelize');
const {totalPrice } = require('../../util/pricetotal')
var models = initModels(sequelize);
const Sequelize = require('sequelize')
const { Op } = require('sequelize');
const { sanphams, maus, doituongs, sizes, loaisanphams, nhacungcaps } = require('../../util/data_select')
const removeVietnameseTones = require('../../util/remove_vn')


class PhieuNhapController {
    // GET phieunhap/index
    async index(req, res, next) {
        try {
            const ncc = req.query.MaNCC
            const page = parseInt(req.query.page) || 1
            const limit = 6
            const offset = (page - 1) * limit                 
            // check ncc 
            let whereNhaCC = {}
            if (ncc){
                whereNhaCC.MaNCC = ncc
            }    
            // selected all Phieu Nhap
            var findAllPN = await models.PhieuNhap.findAll({
                where: whereNhaCC,
                include: [
                    {
                        model: models.NhaCungCap,
                        as: 'MaNCC_NhaCungCap',
                        required: true
                    },
                ],
                order: [['createdAt', 'DESC']],
                limit: limit,
                offset: offset,
            }) 
            // count phieunhap in index
            const countAllPN = await models.PhieuNhap.count({})                   
            // count phieunhap in trash
            const countDeleted = await models.PhieuNhap.count({
                where: {
                    deletedAt: {
                      [Sequelize.Op.not]: null
                    }
                  },
                  paranoid: false,
            })
            // count total page
            const totalPages = Math.ceil(countAllPN / limit)
            res.render('./phieuNhap/index', {
                phieuNhaps: mutipleSequelizeToObject(findAllPN),
                nhaCungCaps: mutipleSequelizeToObject(await nhacungcaps()),
                count: countDeleted,
                currentPage: page,
                totalPages,
            })     
        } catch (error) {
            console.log(error)
            next(error)
        }
        
    }
    // GET /phieunhap/trash
    async trash(req, res, next){
        try {
            const ncc = req.query.MaNCC
            const page = parseInt(req.query.page) || 1
            const limit = 6
            const offset = (page - 1) * limit 
             // check ncc 
             let whereNhaCC = {}
             if (ncc){
                 whereNhaCC.MaNCC = ncc
             }    
             // findAll deleted phieu nhap   
            const phieuNhapDeleted = await models.PhieuNhap.findAll({
                where: {
                    [Op.and]: [
                        {
                            deletedAt:
                            {
                                [Sequelize.Op.not]: null
                            }
                        },
                        whereNhaCC,
                    ]                   
                },
                include: [
                    {
                        model: models.NhaCungCap,
                        as: 'MaNCC_NhaCungCap',
                        required: true
                    },
                ],
                paranoid: false,
                order: [['deletedAt', 'DESC']],
                limit: limit,
                offset: offset,
            })           
            // count phieunhap in trash
            const countDeleted = await models.PhieuNhap.count({
                where: {
                    deletedAt: {
                      [Sequelize.Op.not]: null
                    }
                  },
                  paranoid: false,
            })
            // count total page
            const totalPages = Math.ceil(countDeleted / limit)
            res.render('./phieuNhap/trash', {
                phieunhaps: mutipleSequelizeToObject(phieuNhapDeleted),
                nhaCungCaps: mutipleSequelizeToObject(await nhacungcaps()),
                currentPage: page,
                totalPages,
            })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
    // GET /phieunhap/view-create
    async viewCreate(req, res, next) {      
        res.render('./phieuNhap/create', {
            nhacungcaps: mutipleSequelizeToObject(await nhacungcaps())
        })
    }
    // POST /phieunhap/create
    async create(req, res, next) {
        try {           
            const phieuNhap = await models.PhieuNhap.create({
                MaNCC: req.body.MaNCC,
                // NgayNhapHang: new Date(),
                //NgayNhapHang: Sequelize.fn('GETDATE'),
            })
            const maPN = phieuNhap.MaPhieuNhap
            res.redirect(`/phieunhap/details/${maPN}`)        
            // res.json(req.body)  
        } catch (error) {
            next(error)
            console.log('ERROR CREATE PHIEUNHAP')
        }
    }
    // GET /phieunhap/details/:MaPhieuNhap
    async details(req, res, next) {
        try {
            const MaPN = req.params.MaPhieuNhap
            const phieuNhap = await models.PhieuNhap.findByPk(MaPN)
            const nhaCungCap = await models.NhaCungCap.findByPk(phieuNhap.MaNCC)
            const chiTietPhieuNhaps = await models.ChiTietPhieuNhap.findAll({
            where: {
                MaPhieuNhap: phieuNhap.MaPhieuNhap
            },
            include: [
                {
                    model: models.ChiTietSanPham,
                    as: "MaChiTietSanPham_ChiTietSanPham",
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
        res.render('./phieuNhap/details', {
            phieuNhap: sequelizeToObject(phieuNhap),
            chiTietPhieuNhaps: mutipleSequelizeToObject(chiTietPhieuNhaps),
            nhaCungCap: sequelizeToObject(nhaCungCap), 
            chiTietPhieuNhaps: mutipleSequelizeToObject(chiTietPhieuNhaps),
        })
        } catch (error) {
            console.log(error)
            res.redirect('back')
        }
        
    }
     // GET /phieunhap/detailCTPN/:MaPhieuNhap
     async detailCTPN(req, res, next) {
        try {
            const MaPN = req.params.MaPhieuNhap
            const phieuNhap = await models.PhieuNhap.findByPk(MaPN)
            const nhaCungCap = await models.NhaCungCap.findByPk(phieuNhap.MaNCC)
            const chiTietPhieuNhaps = await models.ChiTietPhieuNhap.findAll({
                where: {
                    MaPhieuNhap: phieuNhap.MaPhieuNhap
                },
                include: [
                    {
                        model: models.ChiTietSanPham,
                        as: "MaChiTietSanPham_ChiTietSanPham",
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
        const total = totalPrice(chiTietPhieuNhaps)
            res.render('./phieuNhap/detailCTPN', {
                phieuNhap: sequelizeToObject(phieuNhap),
                nhaCungCap: sequelizeToObject(nhaCungCap), 
                chiTietPhieuNhaps: mutipleSequelizeToObject(chiTietPhieuNhaps),
                tongTien: total,
            })
        } catch (error) {
            console.log(error)
            res.redirect('back')
        }
    }
    // GET /phieunhap/chonsanpham/:MaPhieuNhap
    async selectProduct(req, res, next) {
        const MaPN = req.params.MaPhieuNhap
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
            res.render('./phieuNhap/selectProduct', {
                listProduct: mutipleSequelizeToObject(listProduct),
                sizes:  mutipleSequelizeToObject(await sizes()),
                maus:  mutipleSequelizeToObject(await maus()),
                loais:  mutipleSequelizeToObject(await loaisanphams()),
                doituongs:  mutipleSequelizeToObject(await doituongs()),
                originalTextSearch: searchConditions.searchText,
                MaPN: MaPN,
                currentPage: page,
                totalPages,   
            })
        }).catch((error) => {
            next(error)
        })
    }
    // POST phieunhap/addchitietphieunhap
    async addCTPN(req, res, next) {
        try {
            req.body.GiaNhap = 0
            req.body.SoLuongNhap = 0
            const ctpn = await models.ChiTietPhieuNhap.create(req.body)
            res.redirect(`/phieunhap/details/${ctpn.MaPhieuNhap}`)
        } catch (error) {
            res.redirect('back')
        }
        
    }
    // PUT phieunhap/updateCTPN
    async updateCTPN(req, res, next) {
        const MaPN = req.body.MaPhieuNhap
        const MaCTSP = req.body.MaChiTietSanPham
        try {
            await models.ChiTietPhieuNhap.update( req.body, {
                where: {
                    MaPhieuNhap: MaPN,
                    MaChiTietSanPham: MaCTSP,
                }
            })
            res.json({ success: true });
        } catch (error) {
            next(error)
        }
    }
    // DELETE /phieunhap/deletectpn
    async deleteCTPN(req, res, next) {
        const MaPhieuNhap = req.body.MaPhieuNhap
        const MaCTSP = req.body.MaChiTietSanPham
        await models.ChiTietPhieuNhap.destroy({
            where: {
                MaPhieuNhap: MaPhieuNhap,
                MaChiTietSanPham: MaCTSP,
            }
        }).then(() => {
            res.redirect('back')
        }).catch((error) => {
            next(error)
        })
    }
    // POST phieunhap/addchitietphieunhaps
    async addCTPNs(req, res, next) {
        try {
            const { MaPhieuNhap, MaChiTietSanPham } = req.body;
            const arrMaChiTietSanPham = JSON.parse(MaChiTietSanPham)
            
            // Tạo một mảng các Promise
            const promises = arrMaChiTietSanPham.map(async (maCTSP) => {
                const availableCTPN = await models.ChiTietPhieuNhap.findOne({
                    where: {
                        MaPhieuNhap: MaPhieuNhap,
                        MaChiTietSanPham: maCTSP,
                    }
                });
    
                if (!availableCTPN) {
                    // Nếu không tìm thấy chi tiết phiếu nhập, thêm mới
                    await models.ChiTietPhieuNhap.create({
                        MaPhieuNhap: MaPhieuNhap,
                        MaChiTietSanPham: maCTSP,
                        GiaNhap: 0,
                        SoLuongNhap: 0,
                    });
                }
            });
    
            // // Chờ tất cả các Promise hoàn thành
             await Promise.all(promises);
    
            // Sau khi tất cả các Promise hoàn thành, thực hiện redirect
            res.redirect(`/phieunhap/details/${req.body.MaPhieuNhap}`);
            
        } catch (error) {
            console.error('Error in addCTPNs:', error);
            res.redirect('back');
        }
    }
    // DELETE /phieunhap/softDelete/:MaPhieuNhap
    async softDelete(req, res, next) {
        try {
            await models.PhieuNhap.destroy({
                where: {
                    MaPhieuNhap: req.params.MaPhieuNhap
                }
            })
            res.redirect('back')
        } catch (error) {
            next(error)
        }
    }
    // DELETE /phieunhap/destroy/:MaPhieuNhap
    async destroyPhieuNhap(req, res, next) {
        try {
            await models.PhieuNhap.destroy({
                where: {
                  MaPhieuNhap: req.params.MaPhieuNhap,
                },
                force: true,
              });
              res.redirect('back')
        } catch (error) {
            next(error)
            console.log('DESTROY PHIEUNHAP ERROR!')
        }
    }
    // PATCH /phieunhap/restore/:MaPhieuNhap
    async restorePhieuNhap(req, res, next) {
        try {
            await models.PhieuNhap.restore({
                where: {
                    MaPhieuNhap: req.params.MaPhieuNhap
                }
            })
            res.redirect('back')
        } catch (error) {
            next(error)
        }
    }
    // POST /phieunhap/handle-indexform-action
    async handleIndexFormActions(req, res, next){
        switch (req.body.action) {
            case 'delete':
                await models.PhieuNhap.destroy({
                    where: {
                        MaPhieuNhap:{
                            [Op.in]: req.body.maphieunhaps,
                        }
                    }
                }).then(() => {
                    res.redirect('back')
                }).catch((error) => { next(error)})
                break;
            case 'restore':
                await models.PhieuNhap.restore({
                    where: {
                        MaPhieuNhap:{
                            [Op.in]: req.body.maphieunhaps,
                        }
                    }
                }).then(() => {
                    res.redirect('back')
                }).catch(() =>{
                    console.log(error)
                    next(error)
                })
                break;
            case 'delete-force':
                await models.PhieuNhap.destroy({
                    where: {
                        MaPhieuNhap:{
                            [Op.in]: req.body.maphieunhaps,
                        },
                    },
                    force: true,
                }).then(() => {
                    res.redirect('back')
                }).catch((error) => {
                    console.log(error)
                    next(error)
                })
                break;
            default: res.json({messge: "Action is not found!"})
                break;
        }     
    }
}

module.exports = new PhieuNhapController
