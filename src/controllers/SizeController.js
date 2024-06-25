
class SizeController {
    //GET /size.page-size
    ListSize(req, res, next) {
        res.send('trang size')
    }
}
module.exports = new SizeController
