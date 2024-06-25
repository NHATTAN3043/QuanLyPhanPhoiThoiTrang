import express from "express"
import configViewEgine from "./config/viewEngine"
import initWebRoute from "./routes/web"
require('./config/connectDB')
const morgan = require('morgan')

const app = express()

//config view egine
configViewEgine(app)

// Dùng để lấy dâta từ middleware
app.use(express.urlencoded({
    extended: true
  }))
// http logger
app.use(morgan('combined')) 

// // testconnection
// connection.conn()
// init web router
initWebRoute(app)

const PORT = 8080

app.listen(PORT, () => {
    console.log(`App listening on port http://localhost:${PORT}`)
  })