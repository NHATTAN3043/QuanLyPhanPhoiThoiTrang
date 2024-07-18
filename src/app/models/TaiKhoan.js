const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TaiKhoan', {
    MaTK: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    MaQuyen: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'PhanQuyen',
        key: 'MaQuyen'
      }
    },
    MaCuaHang: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'CuaHang',
        key: 'MaCuaHang'
      }
    },
    HoTen: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    CCCD: {
      type: DataTypes.CHAR(12),
      allowNull: true
    },
    HinhAnh: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    SDT: {
      type: DataTypes.CHAR(10),
      allowNull: true
    },
    NgaySinh: {
      type: DataTypes.DATE,
      allowNull: true
    },
    Gioitinh: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    DiaChi: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    Email: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: true
    },
    matkhau: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    RefreshToken: {
      type: DataTypes.STRING(300),
      allowNull: true,
    }
  }, {
    sequelize,
    tableName: 'TaiKhoan',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__TaiKhoan__27250070D7488458",
        unique: true,
        fields: [
          { name: "MaTK" },
        ]
      },
    ]
  });
};
