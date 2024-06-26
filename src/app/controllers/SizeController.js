const sequelize = require('../../config/connectDB') // require connection
var initModels = require('../models/init-models')
const { mutipleSequelizeToObject, sequelizeToObject } = require('../../util/sequelize');
var models = initModels(sequelize);
class SizeController {
    
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
            res.redirect('/admin/stored/size')
        } catch (error) {
            next(error)
            console.log('MESSEGE: UPDATESIZE ERROR!')
        }
    }
}
module.exports = new SizeController
