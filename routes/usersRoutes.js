var express = require("express");
var router = express.Router();
const usersController = require("../api/controller/UsersController");

/* --------Users routes------------------ */
router.post("/adduser", usersController.addUsers);
router.post("/add", usersController.userProductInfo);
router.get("/lists", usersController.getUsersList);

module.exports = router;
