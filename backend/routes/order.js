const express = require("express");
const router = express.Router();

const {
  newOrder,
  getSingleOrder,
  myOrders,
  allOrders,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");

const { isAuthentiatedUser, authorizeRoles } = require("../middlewares/auth");

router.route("/order/new").post(isAuthentiatedUser, newOrder);

router.route("/order/:id").get(isAuthentiatedUser, getSingleOrder);
router.route("/orders/me").get(isAuthentiatedUser, myOrders);

router
  .route("/admin/orders/")
  .get(isAuthentiatedUser, authorizeRoles("admin"), allOrders);

router
  .route("/admin/order/:id")
  .put(isAuthentiatedUser, authorizeRoles("admin"), updateOrder)
  .delete(isAuthentiatedUser, authorizeRoles("admin"), deleteOrder);

module.exports = router;
