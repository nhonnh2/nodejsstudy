const express = require("express");
const router = express.Router();
const newsController = require("../app/controller/NewsController");
router.use("/:idnew", newsController.show);
router.use("/", newsController.index);
module.exports = router;