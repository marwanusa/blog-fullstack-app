const {
  getAllUsers,
  getUserProfile,
  updateUserProfile,
  getUsersCount,
  profilePhotoUploadCtrl,
} = require("../controllers/users.controller");
const { photoUpload } = require("../middlewares/photoUpload");
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


router.post("/profile/profile-photo-upload", verifyToken,photoUpload.single("image"), profilePhotoUploadCtrl);

// /api/users/count

router.get("/count", verifyTokenAndAdmin, getUsersCount);

module.exports = router;
