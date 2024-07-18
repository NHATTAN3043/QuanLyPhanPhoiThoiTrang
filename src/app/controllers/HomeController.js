const sequelize = require('../../config/connectDB') // require connection
var initModels = require('../models/init-models')
const { mutipleSequelizeToObject, sequelizeToObject } = require('../../util/sequelize');
var models = initModels(sequelize);

class HomeController {
    // GET /home
    async pageHome(req, res, next) { 
        const user = await models.TaiKhoan.findOne({
            where: {
                Email: req.user.Email
            }
        })    
        res.render('home', {
            user: sequelizeToObject(user),
            maQuyen: req.user.MaQuyen,
        })
    }
}
module.exports = new HomeController