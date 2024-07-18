const sequelize = require('../../config/connectDB') // require connection
var initModels = require('../models/init-models')
const { mutipleSequelizeToObject, sequelizeToObject } = require('../../util/sequelize');
var models = initModels(sequelize);

class MauController {
    //GET /mau/index
    index(req, res, next) {
        models.Mau.findAll({})
            .then(maus => {
                res.render('./mau/index', {
                    maus: mutipleSequelizeToObject(maus),
                    maQuyen: req.user.MaQuyen,
                }) 
            }).catch(error => {
                next(error)
            })
    }
    // GET /mau/view-edit/:MauMau
    async viewEdit(req, res, next) {
        const mau = await models.Mau.findByPk(req.params.MaMau)
        res.render('./mau/edit', {
            mau: sequelizeToObject(mau),
            maQuyen: req.user.MaQuyen,
        })
    }
    // PUT /mau/edit/:MaMau
    async edit(req, res, next) {
        try {
            await models.Mau.update(req.body, {
                where: {
                    MaMau: req.body.MaMau
                }
            })            
            res.redirect('/mau/index')
        } catch (error) {
            next(error)
            console.log('MESSEGE: UPDATE MAU ERROR!')
        }
    }
     // GET /mau/view-create
     viewCreate(req, res, next) {
        res.render('./mau/create', {
            maQuyen: req.user.MaQuyen,
        })
    }
    // POST /mau/create
    async create(req, res, next) {
        try {
            await models.Mau.create(req.body)
            res.redirect('/mau/index')
        } catch (error) {
            next(error)
            console.log('MESSEGE: CREATE MAU ERROR!')
        }
    }
    // DELETE /mau/delete/:MaMau
    async delete(req, res, next) {   
        await models.Mau.destroy({
            where: {
                MaMau: req.params.MaMau
            },
            force: true
        }).then(() => {
            res.redirect('/mau/index')
        }).catch((error) => {
            next(error)
            console.log('MESSEGE: DELETE MAU ERROR!')
        })
   
    }
}
module.exports = new MauController