
class HomeController {
    // GET /
    pageHome(req, res, next) {
        res.render('home')
    }
}
module.exports = new HomeController