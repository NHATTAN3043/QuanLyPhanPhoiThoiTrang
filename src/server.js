const path = require('path')
import express from "express"
import configViewEgine from "./config/viewEngine"
import initWebRoute from "./routes/web"
require('./config/connectDB')
const morgan = require('morgan')
const methodOverride = require('method-override')
require('dotenv').config()
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser')

app.use(express.static(path.join(__dirname, 'public')))
//config view egine
configViewEgine(app)

// JWT
app.use(cors())
app.use(cookieParser())
// Dùng để lấy dâta từ middleware
// Sử dụng middleware để xử lý dữ liệu JSON
app.use(express.json());
app.use(express.urlencoded({
    extended: true
  }))
// http logger
app.use(morgan('combined')) 

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))
// // testconnection
// connection.conn()
// init web router
initWebRoute(app)

const PORT = process.env.DB_PORT ||  8080

app.listen(PORT, () => {
    console.log(`App listening on port http://localhost:${PORT}/taikhoan/view-login`)
  })