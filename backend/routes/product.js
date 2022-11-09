const express = require("express");
const router = express.Router();
const {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productControllers");

const { isAuthentiatedUser, authorizeRoles } = require("../middlewares/auth");

router.route("/products").get(getProducts);

router.route("/products/:id").get(getSingleProduct);

router
  .route("/admin/products/new")
  .post(isAuthentiatedUser, authorizeRoles("admin"), newProduct);

router
  .route("/admin/products/:id")
  .put(isAuthentiatedUser, authorizeRoles("admin"), updateProduct)
  .delete(isAuthentiatedUser, authorizeRoles("admin"), deleteProduct);

module.exports = router;
