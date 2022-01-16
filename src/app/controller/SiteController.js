class SiteController {
    home(req, res) {
        res.render("home");
    }
    search(req, res) {
        res.send("search !!!!!!!!!!!!!");
    }
}
module.exports = new SiteController();