const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('PhieuNhap', {
    MaPhieuNhap: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    MaNCC: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'NhaCungCap',
        key: 'MaNCC'
      }
    },
    NgayNhapHang: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'PhieuNhap',
    schema: 'dbo',
    paranoid: true,
    timestamps: true,
    indexes: [
      {
        name: "PK__PhieuNha__1470EF3BB77A7572",
        unique: true,
        fields: [
          { name: "MaPhieuNhap" },
        ]
      },
    ]
  });
};
