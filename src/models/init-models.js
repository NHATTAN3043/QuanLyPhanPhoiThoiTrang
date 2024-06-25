var DataTypes = require("sequelize").DataTypes;
var _ChiTietDeXuat = require("./ChiTietDeXuat");
var _ChiTietPhieuNhap = require("./ChiTietPhieuNhap");
var _ChiTietSanPham = require("./ChiTietSanPham");
var _CuaHang = require("./CuaHang");
var _DeXuat = require("./DeXuat");
var _DoiTuong = require("./DoiTuong");
var _LoaiSanPham = require("./LoaiSanPham");
var _Mau = require("./Mau");
var _NhaCungCap = require("./NhaCungCap");
var _PhanQuyen = require("./PhanQuyen");
var _PhieuNhap = require("./PhieuNhap");
var _Sanpham = require("./Sanpham");
var _Size = require("./Size");
var _TaiKhoan = require("./TaiKhoan");
var sequelize = require('../config/connectDB')

const initModels = (sequelize) => {
  var ChiTietPhieuNhap = _ChiTietPhieuNhap(sequelize, DataTypes);
  var ChiTietDeXuat = _ChiTietDeXuat(sequelize, DataTypes);
  var ChiTietSanPham = _ChiTietSanPham(sequelize, DataTypes);
  var CuaHang = _CuaHang(sequelize, DataTypes);
  var DeXuat = _DeXuat(sequelize, DataTypes);
  var DoiTuong = _DoiTuong(sequelize, DataTypes);
  var LoaiSanPham = _LoaiSanPham(sequelize, DataTypes);
  var Mau = _Mau(sequelize, DataTypes);
  var NhaCungCap = _NhaCungCap(sequelize, DataTypes);
  var PhanQuyen = _PhanQuyen(sequelize, DataTypes);
  var PhieuNhap = _PhieuNhap(sequelize, DataTypes);
  var Sanpham = _Sanpham(sequelize, DataTypes);
  var Size = _Size(sequelize, DataTypes);
  var TaiKhoan = _TaiKhoan(sequelize, DataTypes);

  ChiTietSanPham.belongsToMany(DeXuat, { as: 'MaDeXuat_DeXuats', through: ChiTietDeXuat, foreignKey: "MaChiTietSanPham", otherKey: "MaDeXuat" });
  ChiTietSanPham.belongsToMany(PhieuNhap, { as: 'MaPhieuNhap_PhieuNhaps', through: ChiTietPhieuNhap, foreignKey: "MaChiTietSanPham", otherKey: "MaPhieuNhap" });
  DeXuat.belongsToMany(ChiTietSanPham, { as: 'MaChiTietSanPham_ChiTietSanPhams', through: ChiTietDeXuat, foreignKey: "MaDeXuat", otherKey: "MaChiTietSanPham" });
  PhieuNhap.belongsToMany(ChiTietSanPham, { as: 'MaChiTietSanPham_ChiTietSanPham_ChiTietPhieuNhaps', through: ChiTietPhieuNhap, foreignKey: "MaPhieuNhap", otherKey: "MaChiTietSanPham" });
  ChiTietDeXuat.belongsTo(ChiTietSanPham, { as: "MaChiTietSanPham_ChiTietSanPham", foreignKey: "MaChiTietSanPham"});
  ChiTietSanPham.hasMany(ChiTietDeXuat, { as: "ChiTietDeXuats", foreignKey: "MaChiTietSanPham"});
  ChiTietPhieuNhap.belongsTo(ChiTietSanPham, { as: "MaChiTietSanPham_ChiTietSanPham", foreignKey: "MaChiTietSanPham"});
  ChiTietSanPham.hasMany(ChiTietPhieuNhap, { as: "ChiTietPhieuNhaps", foreignKey: "MaChiTietSanPham"});
  DeXuat.belongsTo(CuaHang, { as: "MaCuaHang_CuaHang", foreignKey: "MaCuaHang"});
  CuaHang.hasMany(DeXuat, { as: "DeXuats", foreignKey: "MaCuaHang"});
  TaiKhoan.belongsTo(CuaHang, { as: "MaCuaHang_CuaHang", foreignKey: "MaCuaHang"});
  CuaHang.hasMany(TaiKhoan, { as: "TaiKhoans", foreignKey: "MaCuaHang"});
  ChiTietDeXuat.belongsTo(DeXuat, { as: "MaDeXuat_DeXuat", foreignKey: "MaDeXuat"});
  DeXuat.hasMany(ChiTietDeXuat, { as: "ChiTietDeXuats", foreignKey: "MaDeXuat"});
  ChiTietSanPham.belongsTo(DoiTuong, { as: "MaDoiTuong_DoiTuong", foreignKey: "MaDoiTuong"});
  DoiTuong.hasMany(ChiTietSanPham, { as: "ChiTietSanPhams", foreignKey: "MaDoiTuong"});
  ChiTietSanPham.belongsTo(LoaiSanPham, { as: "MaLoaiSanPham_LoaiSanPham", foreignKey: "MaLoaiSanPham"});
  LoaiSanPham.hasMany(ChiTietSanPham, { as: "ChiTietSanPhams", foreignKey: "MaLoaiSanPham"});
  ChiTietSanPham.belongsTo(Mau, { as: "MaMau_Mau", foreignKey: "MaMau"});
  Mau.hasMany(ChiTietSanPham, { as: "ChiTietSanPhams", foreignKey: "MaMau"});
  PhieuNhap.belongsTo(NhaCungCap, { as: "MaNCC_NhaCungCap", foreignKey: "MaNCC"});
  NhaCungCap.hasMany(PhieuNhap, { as: "PhieuNhaps", foreignKey: "MaNCC"});
  TaiKhoan.belongsTo(PhanQuyen, { as: "MaQuyen_PhanQuyen", foreignKey: "MaQuyen"});
  PhanQuyen.hasMany(TaiKhoan, { as: "TaiKhoans", foreignKey: "MaQuyen"});
  ChiTietPhieuNhap.belongsTo(PhieuNhap, { as: "MaPhieuNhap_PhieuNhap", foreignKey: "MaPhieuNhap"});
  PhieuNhap.hasMany(ChiTietPhieuNhap, { as: "ChiTietPhieuNhaps", foreignKey: "MaPhieuNhap"});
  ChiTietSanPham.belongsTo(Sanpham, { as: "MaSanPham_Sanpham", foreignKey: "MaSanPham"});
  Sanpham.hasMany(ChiTietSanPham, { as: "ChiTietSanPhams", foreignKey: "MaSanPham"});
  ChiTietSanPham.belongsTo(Size, { as: "MaSize_Size", foreignKey: "MaSize"});
  Size.hasMany(ChiTietSanPham, { as: "ChiTietSanPhams", foreignKey: "MaSize"});

  return {
    ChiTietDeXuat,
    ChiTietPhieuNhap,
    ChiTietSanPham,
    CuaHang,
    DeXuat,
    DoiTuong,
    LoaiSanPham,
    Mau,
    NhaCungCap,
    PhanQuyen,
    PhieuNhap,
    Sanpham,
    Size,
    TaiKhoan,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
