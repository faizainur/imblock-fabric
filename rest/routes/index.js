var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/ping", function (req, res, next) {
  res.json({
    status: 200,
    message: "server is running",
    server_name: "Imblock Fabric API",
  });
});

module.exports = router;
