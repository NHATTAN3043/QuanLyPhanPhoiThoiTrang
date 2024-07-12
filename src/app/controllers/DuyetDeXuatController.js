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
}

module.exports = new DuyetDeXuatController
