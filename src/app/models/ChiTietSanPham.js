const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ChiTietSanPham', {
    MaChiTietSanPham: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    SoLuong: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    HinhAnh: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    NSX: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    ChatLieu: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    GiaTien: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    MaSanPham: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Sanpham',
        key: 'MaSanPham'
      }
    },
    MaLoaiSanPham: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'LoaiSanPham',
        key: 'MaLoaiSanPham'
      }
    },
    MaMau: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Mau',
        key: 'MaMau'
      }
    },
    MaSize: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Size',
        key: 'MaSize'
      }
    },
    MaDoiTuong: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'DoiTuong',
        key: 'MaDoiTuong'
      }
    }
  }, {
    sequelize,
    tableName: 'ChiTietSanPham',
    schema: 'dbo',
    paranoid: true,
    timestamps: true,
    indexes: [
      {
        name: "PK__ChiTietS__A6B023B0ACE59A8F",
        unique: true,
        fields: [
          { name: "MaChiTietSanPham" },
        ]
      },
    ]
  });
};
