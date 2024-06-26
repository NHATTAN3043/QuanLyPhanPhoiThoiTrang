const path = require('path')
import express from "express"
import configViewEgine from "./config/viewEngine"
import initWebRoute from "./routes/web"
require('./config/connectDB')
const morgan = require('morgan')
const methodOverride = require('method-override')

const app = express()

app.use(express.static(path.join(__dirname, 'public')))
//config view egine
configViewEgine(app)

// Dùng để lấy dâta từ middleware
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

const PORT = 8080

app.listen(PORT, () => {
    console.log(`App listening on port http://localhost:${PORT}`)
  })