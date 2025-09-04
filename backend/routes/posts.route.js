const router = require("express").Router();
const {
  createPostCtrl,
  getAllPostsCtrl,
  getSinglePostCtrl,
  getPostsCount,
  deletePostCtrl,
  updatePostCtrl,
  updatePostImageCtrl,
  toggleLikeCtrl,
} = require("../controllers/posts.controller");
const { photoUpload } = require("../middlewares/photoUpload");
const { verifyToken } = require("../middlewares/verifyToken");
const validateObjectId = require("../middlewares/validateObjectId");
// /api/posts

router
  .route("/")
  .post(photoUpload.single("image"), verifyToken, createPostCtrl)
  .get(getAllPostsCtrl);

router.route("/count").get(getPostsCount);

router
  .route("/:id")
  .get(validateObjectId, getSinglePostCtrl)
  .delete(validateObjectId, verifyToken, deletePostCtrl)
  .put(validateObjectId, verifyToken, updatePostCtrl);
 
router
  .route("/upload-image/:id")
  .put(
    validateObjectId,
    verifyToken,
    photoUpload.single("image"),
    updatePostImageCtrl
  );

router.route("/like/:id").put(validateObjectId, verifyToken, toggleLikeCtrl);
module.exports = router;
