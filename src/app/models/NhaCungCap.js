const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('NhaCungCap', {
    MaNCC: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    TenNCC: {
      type: DataTypes.STRING(50),
      allowNull: true,
      collate: 'SQL_Latin1_General_CP1_CI_AI' // Đặt collate cho trường nếu cần thiết
    },
    DiaChi: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    SDT: {
      type: DataTypes.CHAR(10),
      allowNull: true
    },
    NhanVienLienHe: {
      type: DataTypes.STRING(50),
      allowNull: true,
      collate: 'SQL_Latin1_General_CP1_CI_AI' // Đặt collate cho trường nếu cần thiết
    }
  }, {
    sequelize,
    tableName: 'NhaCungCap',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__NhaCungC__3A185DEBBD892082",
        unique: true,
        fields: [
          { name: "MaNCC" },
        ]
      },
    ]
  });
};
