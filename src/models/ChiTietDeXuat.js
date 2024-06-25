const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ChiTietDeXuat', {
    MaDeXuat: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'DeXuat',
        key: 'MaDeXuat'
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
    LyDoDeXuat: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    SoLuongDeXuat: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    TrangThaiDeXuat: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    SoLuongDuyet: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'ChiTietDeXuat',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__ChiTietD__384F455E9F4B559E",
        unique: true,
        fields: [
          { name: "MaDeXuat" },
          { name: "MaChiTietSanPham" },
        ]
      },
    ]
  });
};
