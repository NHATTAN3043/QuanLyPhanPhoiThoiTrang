const sequelize = require('../../config/connectDB') // require connection
var initModels = require('../models/init-models')
const { mutipleSequelizeToObject, sequelizeToObject } = require('../../util/sequelize');
var models = initModels(sequelize);
const { sanphams, maus, doituongs, sizes, loaisanphams, cuahangs } = require('../../util/data_select')
const { Op, Sequelize } = require('sequelize');
const removeVietnameseTones = require('../../util/remove_vn')

class DuyetDeXuatController {
    // GET /duyetdexuat/index
    async index(req, res, next) {
        const page = parseInt(req.query.page) || 1
        const limit = 6
        const offset = (page - 1) * limit
        const searchConditions = req.query
        let whereConditions = []            
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
                order: [['createdAt', 'DESC']],
                limit: limit,
                offset: offset,
            })
            res.render('./duyetDeXuat/index', {
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
    // GET /duyetdexuat/trash
    async trash(req, res, next) {
        const page = parseInt(req.query.page) || 1
        const limit = 6
        const offset = (page - 1) * limit
        const searchConditions = req.query
        let whereConditions = []            
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
            // data select list
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
                    [Op.and]: [
                        {
                            deletedAt:
                            {
                                [Sequelize.Op.not]: null
                            }
                        },
                        whereConditions,                   
                    ]                   
                },            
                include: [
                    {
                        model: models.CuaHang,
                        as: 'MaCuaHang_CuaHang',
                        required: true,
                    }

                ],
                paranoid: false,
                order: [['createdAt', 'DESC']],
                limit: limit,
                offset: offset,
            })
            res.render('./duyetDeXuat/trash', {
                dexuats: mutipleSequelizeToObject(dexuats),
                cuahangs: mutipleSequelizeToObject(await cuahangs()),
                trangThai: trangThai,  
                originalTextSearch: req.query.searchdocs, 
                currentPage: page,
                totalPages,         
            })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
    // DELETE /duyetdexuat/delete/:MaDeXuat
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
    // PATCH /duyetdexuat/restore/:MaDeXuat
    async restoreDeXuat(req, res, next) {
        try {
            await models.DeXuat.restore({
                where: {
                    MaDeXuat: req.params.MaDeXuat
                }
            })
            res.redirect('back')
        } catch (error) {
            next(error)
        }
    }
    // DELETE /duyetdexuat/destroy/:MaDeXuat
    async destroyDeXuat(req, res, next) {
        try {
            await models.DeXuat.destroy({
                where: {
                    MaDeXuat: req.params.MaDeXuat,
                },
                force: true,
              });
              res.redirect('back')
        } catch (error) {
            next(error)
            console.log('DESTROY DEXUAT ERROR!')
        }
    }
    // POST /duyetdexuat/handle-indexform-action
    async handleIndexFormActions(req, res, next){
        switch (req.body.action) {
            case 'delete':
                await models.DeXuat.destroy({
                    where: {
                        MaDeXuat:{
                            [Op.in]: req.body.madexuats,
                        }
                    }
                }).then(() => {
                    res.redirect('back')
                }).catch((error) => { next(error)})
                break;
            case 'restore':
                await models.DeXuat.restore({
                    where: {
                        MaDeXuat:{
                            [Op.in]: req.body.madexuats,
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
                await models.DeXuat.destroy({
                    where: {
                        MaDeXuat:{
                            [Op.in]: req.body.madexuats,
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
    // GET /duyetdexuat/view-ctdx/:MaDeXuat
    async viewCTDX(req, res, next) {
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
            res.render('./duyetDeXuat/viewCTDX', {
                deXuat: sequelizeToObject(deXuat),
                cuaHangDX: sequelizeToObject(cuaHangDX),
                chitietdexuats: mutipleSequelizeToObject(chitietdexuats),
            })
        } catch (error) {
            next(error)
        }
    }
    // GET /duyetdexuat/view-approvalCTDX
    async viewApprovalCTDX(req, res, next) {
        const { MaDeXuat, MaChiTietSanPham, message} = req.query
        try {
            const selectList = [
                {
                    value: 'Duyệt'
                },
                {
                    value: 'Không duyệt'
                }
            ]
            if (!MaDeXuat || !MaChiTietSanPham) {
                res.redirect('back')
            }else{
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
                res.render('./duyetDeXuat/duyetCTDX', {
                    CTDX: sequelizeToObject(CTDX),
                    selectList,
                    message,
                })
            }

        } catch (error) {
            next(error)
        }
    }
    // PATCH /duyetdexuat/duyet-ctdx
    async approvalCTDX(req, res, next) {
        const { MaDeXuat, MaChiTietSanPham, SoLuongDuyet, TrangThaiDeXuat } = req.body
        var message = ''
        if (!MaDeXuat || !MaChiTietSanPham) {
            res.status(400).json({ error: 'Primary keys are required' })
        }
        else{
            if (SoLuongDuyet <= 0 && TrangThaiDeXuat==='Duyệt'){
                message ='Số lượng duyệt phải > 0!'
                res.redirect(`/duyetdexuat/view-approvalCTDX?MaDeXuat=${MaDeXuat}&MaChiTietSanPham=${MaChiTietSanPham}&message=${message}`)
            }
            if (SoLuongDuyet > 0 && TrangThaiDeXuat==='Không duyệt') {
                message ='Số lượng duyệt phải = 0!'
                res.redirect(`/duyetdexuat/view-approvalCTDX?MaDeXuat=${MaDeXuat}&MaChiTietSanPham=${MaChiTietSanPham}&message=${message}`)
            }
            else {
                try {
                    const CTDXedit = await models.ChiTietDeXuat.update(
                        {   SoLuongDuyet: SoLuongDuyet,
                            TrangThaiDeXuat: TrangThaiDeXuat,
                        },
                        {
                            where: {
                                MaDeXuat: MaDeXuat,
                                MaChiTietSanPham: MaChiTietSanPham,
                            },
                        }
                    )
                    res.redirect(`/duyetdexuat/view-ctdx/${MaDeXuat}`)
                } catch (error) {             
                    console.log(error)  
                    next(error)
                }
            }
        }
    }
    // PATCH /duyetdexuat/duyetDX
    async approvalDX(req, res, next) {
        const madx = req.body.MaDeXuat
        try {
            const duyetCTDX = await models.DeXuat.update(
                {
                    TrangThai: 'Đã duyệt'
                },
                {
                    where: {
                        MaDeXuat: madx,
                    }
                }
            )
            res.redirect('/duyetdexuat/index')
        } catch (error) {
            console.log(error)
            res.redirect('back')
        }

    }
}

module.exports = new DuyetDeXuatController
