
class HomeController {
    // GET /
    pageHome(req, res, next) {
        res.send('page home')
    }
}
module.exports = new HomeController