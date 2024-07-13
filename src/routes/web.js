const sizeRoute = require('./size')
const homeRoute = require('./home')
const mauRoute = require('./mau')
const lspRoute = require('./loai_san_pham')
const doituongRoute = require('./doi_tuong')
const sanphamRoute = require('./san_pham')
const ctspRoute = require('./chi_tiet_san_pham')
const nhacungcaoRoute = require('./nha_cung_cap')
const phieunhapRoute = require('./phieu_nhap')
const dexuatRoute = require('./de_xuat')
const duyetdexuatRoute = require('./duyet_de_xuat')
const vanchuyenRoute = require('./van_chuyen')

function initWebRoute(app) {
    app.use('/size', sizeRoute)
    app.use('/mau', mauRoute)
    app.use('/lsp', lspRoute)
    app.use('/doituong', doituongRoute)
    app.use('/sanpham', sanphamRoute)
    app.use('/ctsp', ctspRoute)
    app.use('/nhacungcap', nhacungcaoRoute)
    app.use('/phieunhap', phieunhapRoute)
    app.use('/dexuat', dexuatRoute)
    app.use('/duyetdexuat', duyetdexuatRoute)
    app.use('/vanchuyen', vanchuyenRoute)
    app.use('/', homeRoute)
}

export default initWebRoute
