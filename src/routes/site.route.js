//những trang không có nhiều controller như trang home contact
const express = require("express");
const router = express.Router();
const siteController = require("../app/controller/SiteController");

router.get("/home", siteController.home);
router.get("/search", siteController.search);
router.get("/", siteController.home);
module.exports = router;