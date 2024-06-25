const sequelize = require('../config/connectDB') // require connection
var initModels = require('../models/init-models')
var models = initModels(sequelize);
class SizeController {
    //GET /size/page-size
    ListSize(req, res, next) {
        models.Size.findAll({})
            .then(sizes => {
                res.json(sizes)
            }).catch(error => {
                next(error)
            })

    }
}
module.exports = new SizeController
