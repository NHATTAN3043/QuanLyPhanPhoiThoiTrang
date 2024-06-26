const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('LoaiSanPham', {
    MaLoaiSanPham: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    TenLoaiSanPham: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'LoaiSanPham',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__LoaiSanP__ECCF699F0DF093C9",
        unique: true,
        fields: [
          { name: "MaLoaiSanPham" },
        ]
      },
    ]
  });
};
