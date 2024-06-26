const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('CuaHang', {
    MaCuaHang: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    TenCuahang: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    DiaChi: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'CuaHang',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__CuaHang__0840BCA672B31186",
        unique: true,
        fields: [
          { name: "MaCuaHang" },
        ]
      },
    ]
  });
};
