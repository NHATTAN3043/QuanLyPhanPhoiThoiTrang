const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Size', {
    MaSize: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    TenSize: {
      type: DataTypes.STRING(50),
      allowNull: true,
    }
  }, {
    sequelize,
    tableName: 'Size',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__Size__A787E7EDA872880D",
        unique: true,
        fields: [
          { name: "MaSize" },
        ]
      },
    ]
  });
};
