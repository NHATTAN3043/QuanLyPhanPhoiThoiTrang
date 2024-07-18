const sequelize = require('../../config/connectDB') // require connection
var initModels = require('../models/init-models')
const { mutipleSequelizeToObject, sequelizeToObject } = require('../../util/sequelize');
var models = initModels(sequelize);

class CuaHangController {
    //GET /cuahang/index
    index(req, res, next) {
        models.CuaHang.findAll({})
            .then(cuahangs => {
                res.render('./cuaHang/index', {
                    cuahangs: mutipleSequelizeToObject(cuahangs),
                    maQuyen: req.user.MaQuyen,
                }) 
            }).catch(error => {
                next(error)
            })
    }
    // GET /cuahang/view-edit/:MauCuaHang
    async viewEdit(req, res, next) {
        const cuahang = await models.CuaHang.findByPk(req.params.MaCuaHang)
        res.render('./cuaHang/edit', {
            cuahang: sequelizeToObject(cuahang),
            maQuyen: req.user.MaQuyen,
        })
    }
    // PUT /cuahang/edit
    async edit(req, res, next) {
        try {
            await models.CuaHang.update(req.body, {
                where: {
                    MaCuaHang: req.body.MaCuaHang
                }
            })            
            res.redirect('/cuahang/index')
        } catch (error) {
            next(error)
        }
    }
     // GET /cuahang/view-create
     viewCreate(req, res, next) {
        res.render('./cuaHang/create', {
            maQuyen: req.user.MaQuyen,
        })
    }
    // POST /cuahang/create
    async create(req, res, next) {
        try {
            await models.CuaHang.create(req.body)
            res.redirect('/cuahang/index')
        } catch (error) {
            next(error)
        }
    }
    // DELETE /cuahang/delete/:MaCuaHang
    async delete(req, res, next) {   
        await models.CuaHang.destroy({
            where: {
                MaCuaHang: req.params.MaCuaHang
            },
            force: true
        }).then(() => {
            res.redirect('/cuahang/index')
        }).catch((error) => {
            next(error)
        })
   
    }
}
module.exports = new CuaHangController