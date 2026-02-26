const express = require("express");
const route = express.Router();

const controller = require("../controller/productController");

route.get("/", controller.showHome);
route.post("/products", controller.createProduct);

module.exports = route;