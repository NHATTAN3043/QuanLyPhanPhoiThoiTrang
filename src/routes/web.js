const sizeRoute = require('./size')
const homeRoute = require('./home')

function initWebRoute(app) {
    app.use('/size', sizeRoute)
    app.use('/', homeRoute)
}

export default initWebRoute
