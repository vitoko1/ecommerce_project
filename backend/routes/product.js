const express = require("express");
const router = express.Router();
const {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getProductReviews,
  deleteReview
} = require("../controllers/productControllers");

const { isAuthentiatedUser, authorizeRoles } = require("../middlewares/auth");

router.route("/products").get(getProducts);

router.route("/product/:id").get(getSingleProduct);

router
  .route("/admin/products/new")
  .post(isAuthentiatedUser, authorizeRoles("admin"), newProduct);

router
  .route("/admin/products/:id")
  .put(isAuthentiatedUser, authorizeRoles("admin"), updateProduct)
  .delete(isAuthentiatedUser, authorizeRoles("admin"), deleteProduct);

router.route("/review").put(isAuthentiatedUser,createProductReview)

router.route("/reviews").get(isAuthentiatedUser,getProductReviews)
router.route("/reviews").delete(isAuthentiatedUser,deleteReview)
module.exports = router;
