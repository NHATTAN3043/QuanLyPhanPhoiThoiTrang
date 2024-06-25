const { Sequelize } = require('sequelize')

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('phanPhoiHangHoaThoiTrang', 'sa', 'Tan0369463503@', {
    host: 'localhost',
    dialect: 'mssql',
    dialectOptions: {
      options: {
        encrypt: true,  // Sử dụng mã hóa nếu cần thiết
        trustServerCertificate: true // Cần thiết nếu bạn sử dụng tự ký chứng chỉ
      }
    }
  });

// Test the connection to the database
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
