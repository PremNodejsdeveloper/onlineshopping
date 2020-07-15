var express = require("express");
var router = express.Router();
const productController = require("../api/controller/ProductController");

/* --------Product routes------------------ */
router.post("/addnew", productController.addNewProduct);

module.exports = router;
