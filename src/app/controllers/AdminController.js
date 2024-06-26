const sequelize = require('../../config/connectDB') // require connection
var initModels = require('../models/init-models')
const { mutipleSequelizeToObject, sequelizeToObject } = require('../../util/sequelize');
var models = initModels(sequelize);

class AdminController {
    //GET /admin/stored/size
    indexSize(req, res, next) {
        models.Size.findAll({})
            .then(sizes => {
                res.render('./admin/indexSize', {
                    sizes: mutipleSequelizeToObject(sizes)
                }) 
            }).catch(error => {
                next(error)
            })
    }
}
module.exports = new AdminController