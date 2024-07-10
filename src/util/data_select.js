const sequelize = require('../config/connectDB') // require connection
var initModels = require('../app/models/init-models')
var models = initModels(sequelize);
const Sequelize = require('sequelize')
const { Op } = require('sequelize');

const sanphams = async function() {
    try {
        const list = await models.Sanpham.findAll({})
        return list
    } catch (error) {
        console.log(error)
        return null
    }
    
}

const maus = async function() {
    try {
        const list = await models.Mau.findAll({})
        return list
    } catch (error) {
        console.log(error)
        return null
    }
}

const sizes = async function() {
    try {
        const list = await models.Size.findAll({})
        return list
    } catch (error) {
        console.log(error)
        return null
    }
}

const loaisanphams = async function() {
    try {
        const list = await models.LoaiSanPham.findAll({})
        return list
    } catch (error) {
        console.log(error)
        return null
    }
}

const doituongs = async function() {
    try {
        const list = await models.DoiTuong.findAll({})
        return list
    } catch (error) {
        console.log(error)
        return null
    }
}

const nhacungcaps = async function() {
    try {
        const list = await models.NhaCungCap.findAll({})
        return list
    } catch (error) {
        console.log(error)
        return null
    }
}

const cuahangs = async function() {
    try {
        const list = await models.CuaHang.findAll({})
        return list
    } catch (error) {
        console.log(error)
        return null
    }
}

module.exports = { sanphams, maus, doituongs, sizes, loaisanphams, nhacungcaps, cuahangs }