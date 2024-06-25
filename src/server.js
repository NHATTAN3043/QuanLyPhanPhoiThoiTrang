import express from "express"
import configViewEgine from "./config/viewEngine"
import initWebRoute from "./routes/web"
const morgan = require('morgan')

const app = express()

//config view egine
configViewEgine(app)

// http logger
app.use(morgan('combined')) 

// init web router
initWebRoute(app)

const PORT = 8080

app.listen(PORT, () => {
    console.log(`App listening on port http://localhost:${PORT}`)
  })