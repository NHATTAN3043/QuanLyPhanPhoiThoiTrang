const sequelize = require('../../config/connectDB') // require connection
var initModels = require('../models/init-models')
const { mutipleSequelizeToObject, sequelizeToObject } = require('../../util/sequelize');
var models = initModels(sequelize);
class SizeController {
    //GET /size/index
    index(req, res, next) {
        models.Size.findAll({})
            .then(sizes => {
                res.render('./size/index', {
                    sizes: mutipleSequelizeToObject(sizes)
                }) 
            }).catch(error => {
                next(error)
            })
    }
    
    // GET /size/view-edit/:MaSize
    async viewEdit(req, res, next) {
        const size = await models.Size.findByPk(req.params.MaSize)
        res.render('./size/edit', {
            size: sequelizeToObject(size)
        })
    }
    // PUT /size/edit/:MaSize
    async edit(req, res, next) {
        try {
            await models.Size.update(req.body, {
                where: {
                    MaSize: req.body.MaSize
                }
            })            
            res.redirect('/size/index')
        } catch (error) {
            next(error)
            console.log('MESSEGE: UPDATE SIZE ERROR!')
        }
    }
    // GET /size/view-create
    viewCreate(req, res, next) {
        res.render('./size/create')
    }
    // POST /size/create
    async create(req, res, next) {
        try {
            await models.Size.create(req.body)
            res.redirect('/size/index')
        } catch (error) {
            next(error)
            console.log('MESSEGE: CREATE SIZE ERROR!')
        }
    }
    // DELETE /size/delete/:MaSize
    async delete(req, res, next) {   
        await models.Size.destroy({
            where: {
                MaSize: req.params.MaSize
            },
            force: true
        }).then(() => {
            res.redirect('/size/index')
        }).catch((error) => {
            next(error)
            console.log('MESSEGE: DELETE SIZE ERROR!')
        })
   
    }
}
module.exports = new SizeController
