const sequelize = require('../../config/connectDB') // require connection
var initModels = require('../models/init-models')
const { mutipleSequelizeToObject, sequelizeToObject } = require('../../util/sequelize');
var models = initModels(sequelize);

class SanPhamController {
    //GET /sanpham/index
    index(req, res, next) {
        models.Sanpham.findAll({})
            .then(sanphams => {
                res.render('./sanPham/index', {
                    sanphams: mutipleSequelizeToObject(sanphams)
                }) 
            }).catch(error => {
                next(error)
            })
    }
    // GET /sanpham/view-edit/:MaSanPham
    async viewEdit(req, res, next) {
        const sanpham = await models.Sanpham.findByPk(req.params.MaSanPham)
        res.render('./sanPham/edit', {
            sanpham: sequelizeToObject(sanpham)
        })
    }
    // PUT /sanpham/edit/:MaSanPham
    async edit(req, res, next) {
        try {
            await models.Sanpham.update(req.body, {
                where: {
                    MaSanPham: req.body.MaSanPham
                }
            })            
            res.redirect('/sanpham/index')
        } catch (error) {
            next(error)
            console.log('MESSEGE: UPDATE SANPHAM ERROR!')
        }
    }
     // GET /sanpham/view-create
     viewCreate(req, res, next) {
        res.render('./sanPham/create')
    }
    // POST /sanpham/create
    async create(req, res, next) {
        try {
            await models.Sanpham.create(req.body)
            res.redirect('/sanpham/index')
        } catch (error) {
            next(error)
            console.log('MESSEGE: CREATE SANPHAM ERROR!')
        }
    }
    // DELETE /sanpham/delete/:MaSanPham
    async delete(req, res, next) {   
        await models.Sanpham.destroy({
            where: {
                MaSanPham: req.params.MaSanPham
            },
            force: true
        }).then(() => {
            res.redirect('/sanpham/index')
        }).catch((error) => {
            next(error)
            console.log('MESSEGE: DELETE SANPHAM ERROR!')
        })
   
    }
}
module.exports = new SanPhamController