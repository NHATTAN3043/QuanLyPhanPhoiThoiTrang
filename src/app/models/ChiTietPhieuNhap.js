const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ChiTietPhieuNhap', {
    MaPhieuNhap: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'PhieuNhap',
        key: 'MaPhieuNhap'
      }
    },
    MaChiTietSanPham: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'ChiTietSanPham',
        key: 'MaChiTietSanPham'
      }
    },
    SoLuongNhap: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    GiaNhap: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    ThanhTien: {
      type: DataTypes.DOUBLE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'ChiTietPhieuNhap',
    schema: 'dbo',
    hasTrigger: true,
    timestamps: false,
    indexes: [
      {
        name: "PK__ChiTietP__0E1BED0038CD37C2",
        unique: true,
        fields: [
          { name: "MaPhieuNhap" },
          { name: "MaChiTietSanPham" },
        ]
      },
    ]
  });
};
