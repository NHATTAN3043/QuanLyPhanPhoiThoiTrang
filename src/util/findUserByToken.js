const bcrypt = require('bcrypt')
const { Op } = require('sequelize')
const sequelize = require('../config/connectDB') // require connection
var initModels = require('../app/models/init-models')
var models = initModels(sequelize);
const { mutipleSequelizeToObject, sequelizeToObject } = require('./sequelize');


const findUserByToken = async function(token) {
    try {
        if (!token) {
            return null
        }
        // Truy xuất tất cả các bản ghi từ bảng TaiKhoan
        const Alluser = await models.TaiKhoan.findAll();
        const users = mutipleSequelizeToObject(Alluser)
        // Lặp qua tất cả các bản ghi để so sánh token
        for (const user of users) {
            var RefreshToken = user.RefreshToken || "abc"
            const isMatch = await bcrypt.compare(token, RefreshToken);
            if (isMatch) {
                return user;
            }
        }
    
        // Nếu không tìm thấy người dùng, trả về null
        return null;
      } catch (err) {
        console.error('Error finding user by token:', err);
        throw err;
      }
}

module.exports = findUserByToken
