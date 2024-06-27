const { Sequelize } = require('sequelize')
require('dotenv').config()

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
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
