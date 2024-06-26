const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Mau', {
    MaMau: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    TenMau: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Mau',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__Mau__3A5BBB7D2A470827",
        unique: true,
        fields: [
          { name: "MaMau" },
        ]
      },
    ]
  });
};
