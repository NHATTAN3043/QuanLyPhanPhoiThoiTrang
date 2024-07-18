const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Sanpham', {
    MaSanPham: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    TenSanPham: {
      type: DataTypes.STRING(50),
      allowNull: true,
    }
  }, {
    sequelize,
    tableName: 'Sanpham',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__Sanpham__FAC7442D8C465DFB",
        unique: true,
        fields: [
          { name: "MaSanPham" },
        ]
      },
    ]
  });
};
