const newsRouter = require("./news.route");
const siteRouter = require("./site.route");

function route(app) {
    //routing
    //get render post send
    //Action--dispatcher--function handler
    // app.get("/home", (req, res) => {
    //     res.render("home", { title: "Home" });
    // });
    app.use("/news", newsRouter);
    app.use("/", siteRouter);
}
module.exports = route;