const sizeRoute = require('./size')
const homeRoute = require('./home')
const adminRoute = require('./admin')
function initWebRoute(app) {
    app.use('/size', sizeRoute)
    app.use('/admin', adminRoute)
    app.use('/', homeRoute)
}

export default initWebRoute
