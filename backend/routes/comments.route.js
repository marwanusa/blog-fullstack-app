const {
  createCommentCtrl,
  getAllComments,
  deleteComment,
  updateCommentCtrl,
} = require("../controllers/comments.controller");

const validateObjectId = require("../middlewares/validateObjectId");
const {
  verifyToken,
  verifyTokenAndAdmin,
} = require("../middlewares/verifyToken");

const router = require("express").Router();

// /api/comments
router
  .route("/")
  .post(verifyToken, createCommentCtrl)
  .get(verifyTokenAndAdmin, getAllComments);

// /api/comments/:id

router
  .route("/:id")
  .delete(validateObjectId, verifyToken, deleteComment)
  .put(validateObjectId, verifyToken, updateCommentCtrl);

module.exports = router;
