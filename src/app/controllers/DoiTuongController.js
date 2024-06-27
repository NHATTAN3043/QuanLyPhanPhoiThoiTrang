const sequelize = require('../../config/connectDB') // require connection
var initModels = require('../models/init-models')
const { mutipleSequelizeToObject, sequelizeToObject } = require('../../util/sequelize');
var models = initModels(sequelize);

class DoiTuongController {
    //GET /doituong/index
    index(req, res, next) {
        models.DoiTuong.findAll({})
            .then(doituongs => {
                res.render('./doiTuong/index', {
                    doituongs: mutipleSequelizeToObject(doituongs)
                }) 
            }).catch(error => {
                next(error)
            })
    }
    // GET /doituong/view-edit/:MaDoiTuong
    async viewEdit(req, res, next) {
        const doituong = await models.DoiTuong.findByPk(req.params.MaDoiTuong)
        res.render('./doiTuong/edit', {
            doituong: sequelizeToObject(doituong)
        })
    }
    // PUT /doituong/edit/:MaDoiTuong
    async edit(req, res, next) {
        try {
            await models.DoiTuong.update(req.body, {
                where: {
                    MaDoiTuong: req.body.MaDoiTuong
                }
            })            
            res.redirect('/doiTuong/index')
        } catch (error) {
            next(error)
            console.log('MESSEGE: UPDATE DOITUONG ERROR!')
        }
    }
     // GET /doituong/view-create
     viewCreate(req, res, next) {
        res.render('./doiTuong/create')
    }
    // POST /doituong/create
    async create(req, res, next) {
        try {
            await models.DoiTuong.create(req.body)
            res.redirect('/doiTuong/index')
        } catch (error) {
            next(error)
            console.log('MESSEGE: CREATE DOITUONG ERROR!')
        }
    }
    // DELETE /doituong/delete/:MaDoiTuong
    async delete(req, res, next) {   
        await models.DoiTuong.destroy({
            where: {
                MaDoiTuong: req.params.MaDoiTuong
            },
            force: true
        }).then(() => {
            res.redirect('/doiTuong/index')
        }).catch((error) => {
            next(error)
            console.log('MESSEGE: DELETE DOITUONG ERROR!')
        })
   
    }
}
module.exports = new DoiTuongController