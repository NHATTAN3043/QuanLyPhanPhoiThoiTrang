const sizeRoute = require('./size')
const homeRoute = require('./home')
const mauRoute = require('./mau')
const lspRoute = require('./loai_san_pham')
const doituongRoute = require('./doi_tuong')
const sanphamRoute = require('./san_pham')

function initWebRoute(app) {
    app.use('/size', sizeRoute)
    app.use('/mau', mauRoute)
    app.use('/lsp', lspRoute)
    app.use('/doituong', doituongRoute)
    app.use('/sanpham', sanphamRoute)
    app.use('/', homeRoute)
}

export default initWebRoute
