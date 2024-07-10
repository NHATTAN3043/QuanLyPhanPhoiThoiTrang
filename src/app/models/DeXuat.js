const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('DeXuat', {
    MaDeXuat: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Tieude: {
      type: DataTypes.STRING(100),
      allowNull: true,
      collate: 'SQL_Latin1_General_CP1_CI_AI' // Đặt collate cho trường nếu cần thiết
    },
    NgayDeXuat: {
      type: DataTypes.DATE,
      allowNull: true
    },
    TrangThai: {
      type: DataTypes.STRING(15),
      allowNull: true,
    },
    Created: {
      type: DataTypes.CHAR(1),
      allowNull: true
    },
    MaCuaHang: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'CuaHang',
        key: 'MaCuaHang'
      }
    }
  }, {
    sequelize,
    tableName: 'DeXuat',
    schema: 'dbo',
    hasTrigger: true,
    paranoid: true,
    timestamps: true,
    indexes: [
      {
        name: "PK__DeXuat__222447655D0842C4",
        unique: true,
        fields: [
          { name: "MaDeXuat" },
        ]
      },
    ]
  });
};
