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
const {
  isAuthentificatedUser,
  authorizeRoles,
} = require("../middlewares/auth");

router.route("/order/new").post(isAuthentificatedUser, newOrder);
router.route("/order/:id").get(isAuthentificatedUser, getSingleOrder);

router.route("/orders/me").get(isAuthentificatedUser, myOrders);
router
  .route("/admin/orders")
  .get(isAuthentificatedUser, authorizeRoles("admin"), allOrders);

router
  .route("/admin/order/:id")
  .put(isAuthentificatedUser, authorizeRoles("admin"), updateOrder)
  .delete(isAuthentificatedUser, authorizeRoles("admin"), deleteOrder);

module.exports = router;
