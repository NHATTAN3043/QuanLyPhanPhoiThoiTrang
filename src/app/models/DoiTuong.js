const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('DoiTuong', {
    MaDoiTuong: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    TenDoiTuong: {
      type: DataTypes.STRING(50),
      allowNull: true,
    }
  }, {
    sequelize,
    tableName: 'DoiTuong',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__DoiTuong__291408A123B2A6A5",
        unique: true,
        fields: [
          { name: "MaDoiTuong" },
        ]
      },
    ]
  });
};
