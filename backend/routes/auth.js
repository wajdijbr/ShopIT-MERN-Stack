const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  getUserProfile,
  updatePassword,
  updateProfile,
  allUsers,
  getUserDetails,
  updateUser,
  deleteUser,
} = require("../controllers/authController");
const {
  isAuthentificatedUser,
  authorizeRoles,
} = require("../middlewares/auth");
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/me").get(isAuthentificatedUser, getUserProfile);
router.route("/password/update").put(isAuthentificatedUser, updatePassword);
router.route("/me/update").put(isAuthentificatedUser, updateProfile);

router
  .route("/admin/users")
  .get(isAuthentificatedUser, authorizeRoles("admin"), allUsers);
router
  .route("/admin/user/:id")
  .get(isAuthentificatedUser, authorizeRoles("admin"), getUserDetails);
router
  .route("/admin/user/:id")
  .put(isAuthentificatedUser, authorizeRoles("admin"), updateUser)
  .delete(isAuthentificatedUser, authorizeRoles("admin"), deleteUser);

module.exports = router;
