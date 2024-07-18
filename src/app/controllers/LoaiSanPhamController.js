const sequelize = require('../../config/connectDB') // require connection
var initModels = require('../models/init-models')
const { mutipleSequelizeToObject, sequelizeToObject } = require('../../util/sequelize');
var models = initModels(sequelize);

class LoaiSanPhamController {
    //GET /lsp/index
    index(req, res, next) {
        models.LoaiSanPham.findAll({})
            .then(lsps => {
                res.render('./loaiSanPham/index', {
                    lsps: mutipleSequelizeToObject(lsps),
                    maQuyen: req.user.MaQuyen,
                }) 
            }).catch(error => {
                next(error)
            })
    }
    // GET /lsp/view-edit/:MaLoaiSanPham
    async viewEdit(req, res, next) {
        const lsp = await models.LoaiSanPham.findByPk(req.params.MaLoaiSanPham)
        res.render('./loaiSanPham/edit', {
            lsp: sequelizeToObject(lsp),
            maQuyen: req.user.MaQuyen,
        })
    }
    // PUT /lsp/edit/:MaLoaiSanPham
    async edit(req, res, next) {
        try {
            await models.LoaiSanPham.update(req.body, {
                where: {
                    MaLoaiSanPham: req.body.MaLoaiSanPham
                }
            })            
            res.redirect('/lsp/index')
        } catch (error) {
            next(error)
            console.log('MESSEGE: UPDATE LSP ERROR!')
        }
    }
     // GET /lsp/view-create
     viewCreate(req, res, next) {
        res.render('./loaiSanPham/create', {
            maQuyen: req.user.MaQuyen,
        })
    }
    // POST /lsp/create
    async create(req, res, next) {
        try {
            await models.LoaiSanPham.create(req.body)
            res.redirect('/lsp/index')
        } catch (error) {
            next(error)
            console.log('MESSEGE: CREATE LSP ERROR!')
        }
    }
    // DELETE /lsp/delete/:MaLoaiSanPham
    async delete(req, res, next) {   
        await models.LoaiSanPham.destroy({
            where: {
                MaLoaiSanPham: req.params.MaLoaiSanPham
            },
            force: true
        }).then(() => {
            res.redirect('/lsp/index')
        }).catch((error) => {
            next(error)
            console.log('MESSEGE: DELETE LSP ERROR!')
        })
   
    }
}
module.exports = new LoaiSanPhamController