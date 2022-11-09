const express = require("express");
const router = express.Router();
const {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productControllers");

const { isAuthentiatedUser } = require("../middlewares/auth");

router.route("/products").get(isAuthentiatedUser, getProducts);
router.route("/products/:id").get(getSingleProduct);
router.route("/products/new").post(newProduct);

router.route("/admin/products/:id").put(updateProduct).delete(deleteProduct);

module.exports = router;
