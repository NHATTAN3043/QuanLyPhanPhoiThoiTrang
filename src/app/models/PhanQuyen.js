const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('PhanQuyen', {
    MaQuyen: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    TenQuyen: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'PhanQuyen',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__PhanQuye__1D4B7ED42298DBAD",
        unique: true,
        fields: [
          { name: "MaQuyen" },
        ]
      },
    ]
  });
};
