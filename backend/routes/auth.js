const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  logout,
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

const { isAuthentiatedUser, authorizeRoles } = require("../middlewares/auth")

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);

router.route("/logout").get(logout);

router.route("/me").get(isAuthentiatedUser, getUserProfile);
router.route("/password/update").put(isAuthentiatedUser, updatePassword);
router.route("/me/update").put(isAuthentiatedUser, updateProfile);

router.route("/admin/users").get(isAuthentiatedUser, authorizeRoles('admin'), allUsers);
router.route("/admin/user/:id")
      .get(isAuthentiatedUser, authorizeRoles('admin'), getUserDetails)
      .put(isAuthentiatedUser, authorizeRoles('admin'), updateUser)
      .delete(isAuthentiatedUser, authorizeRoles('admin'), deleteUser)

module.exports = router;
