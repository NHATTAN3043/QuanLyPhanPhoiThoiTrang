const {sequelizeToObject, mutipleSequelizeToObject} = require('./sequelize')

module.exports = {
    totalPrice: function(list) {
        var total = mutipleSequelizeToObject(list)
        var i = 0
        total.map((ctsp) => {
            i += ctsp.ThanhTien
        })
        return i
    }
}
