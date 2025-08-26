const {
  getAllUsers,
  getUserProfile,
  updateUserProfile,
  getUsersCount,
} = require("../controllers/users.controller");
const validateObjectId = require("../middlewares/validateObjectId");
const {
  verifyTokenAndAdmin,
  verifyToken,
  verifyTokenAndUser,
} = require("../middlewares/verifyToken");

const router = require("express").Router();

// /api/users/profile

router.get("/profile", verifyTokenAndAdmin, getAllUsers); // or router.route("/profile").get(verifyTokenAndAdmin,getAllUsers)

router
  .route("/profile/:id")
  .get(validateObjectId, getUserProfile)
  .put(validateObjectId, verifyTokenAndUser, updateUserProfile);

// /api/users/count

router.get("/count", verifyTokenAndAdmin, getUsersCount);

module.exports = router;
