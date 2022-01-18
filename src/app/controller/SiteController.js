const Course = require("../model/Course");
const { mutipleMongooseToObject } = require("../../util/mongoose");
class SiteController {
    home(req, res, next) {
        Course.find({})
            .then((courses) => {
                //map object mongoose sang object thông thường
                res.render("home", {
                    title: "Home",
                    courses: mutipleMongooseToObject(courses),
                });
            })
            // .catch((err) => next(err));
            .catch(next);
    }
    search(req, res) {
        res.send("search !!!!!!!!!!!!!");
    }
}
module.exports = new SiteController();