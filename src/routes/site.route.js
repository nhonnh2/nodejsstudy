//những trang không có nhiều controller như trang home contact
const express = require("express");
const router = express.Router();
const siteController = require("../app/controller/SiteController");

router.use("/home", siteController.home);
router.use("/search", siteController.search);
router.use("/", siteController.home);
module.exports = router;