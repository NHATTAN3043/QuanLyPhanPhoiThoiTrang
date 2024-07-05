const sequelize = require('../../config/connectDB') // require connection
var initModels = require('../models/init-models')
const { mutipleSequelizeToObject, sequelizeToObject } = require('../../util/sequelize');
const {totalPrice } = require('../../util/pricetotal')
const { DATE } = require('sequelize');
var models = initModels(sequelize);
const Sequelize = require('sequelize')
const { Op } = require('sequelize');

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
    async trash(req, res, next){
        await models.PhieuNhap.findAll({
            where: {
                deletedAt: {
                  [Sequelize.Op.not]: null
                }
              },
            include: [
                {
                    model: models.NhaCungCap,
                    as: 'MaNCC_NhaCungCap',
                    required: true
                },
            ],
            paranoid: false,
            order: [['deletedAt', 'DESC']]
        }).then((phieunhaps) => {
            res.render('./phieuNhap/trash', {
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
            const phieuNhap = await models.PhieuNhap.create({
                MaNCC: req.body.MaNCC,
                // NgayNhapHang: new Date(),
                NgayNhapHang: Sequelize.fn('GETDATE'),
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
            nhaCungCap: sequelizeToObject(nhaCungCap), 
            chiTietPhieuNhaps: mutipleSequelizeToObject(chiTietPhieuNhaps),
            tongTien: total,
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
        }).then((listProduct) => {
            res.render('./phieuNhap/selectProduct', {
                listProduct: mutipleSequelizeToObject(listProduct),
                MaPN: MaPN,
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
            
        }
    }
}

module.exports = new PhieuNhapController
