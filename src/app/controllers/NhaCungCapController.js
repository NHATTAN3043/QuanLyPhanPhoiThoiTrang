const sequelize = require('../../config/connectDB') // require connection
var initModels = require('../models/init-models')
const { mutipleSequelizeToObject, sequelizeToObject } = require('../../util/sequelize');
var models = initModels(sequelize);

class NhaCungCapController {
    // GET nhacungcap/index
    async index(req, res, next) {
        await models.NhaCungCap.findAll({})
            .then((nhacungcaps => {
                res.render('./nhaCungCap/index', {
                    nhacungcaps: mutipleSequelizeToObject(nhacungcaps),
                    maQuyen: req.user.MaQuyen,
                })
            }))
    }
    // GET nhacungcap/view-create
    async viewCreate(req, res, next) {
        res.render('./nhaCungCap/create', {
            maQuyen: req.user.MaQuyen,
        })
    }
    // POST nhacungcap/create
    async create(req, res, next) {
        await models.NhaCungCap.create(req.body)
            .then(() => {
                res.redirect('/nhacungcap/index')
            }).catch((error) => {
                next(error)
            })
    }
    // GET /nhacungcap/view-edit/:MaNCC
    async viewEdit(req, res, next) {
        await models.NhaCungCap.findByPk(req.params.MaNCC)
            .then((nhacc) => {
                res.render('./nhaCungCap/edit',
                {
                    nhacc: sequelizeToObject(nhacc),
                    maQuyen: req.user.MaQuyen,

                })
            }).catch((error) =>{
                next(error)
            })
    }
    // PUT /nhacungcap/edit/:MaNCC
    async edit(req, res, next) {
        const maNCC = req.params.MaNCC
        try {
            await models.NhaCungCap.update(req.body, {
                where: {
                    MaNCC: maNCC
                }
            })
            res.redirect('/nhacungcap/index')
        } catch (error) {
            next(error)
        }
    }
    // DELETE /nhacungcap/delete/:MaNCC
    async delete(req, res, next) {
        await models.NhaCungCap.destroy({
            where: {
                MaNCC: req.params.MaNCC
            }
        }).then(() => {
            res.redirect('back')
        }).catch((error) => {
            next(error)
        })
        
    }
}

module.exports = new NhaCungCapController
