const newsRouter = require('./news.route');
const siteRouter = require('./site.route');
const coursesRouter = require('./courses.route');
const meRouter = require('./me.route');

function route(app) {
    //routing
    //get render post send
    //Action--dispatcher--function handler
    // app.get("/home", (req, res) => {
    //     res.render("home", { title: "Home" });
    // });
    app.use('/news', newsRouter);
    app.use('/courses', coursesRouter);
    app.use('/me', meRouter);
    app.use('/', siteRouter);
}
module.exports = route;