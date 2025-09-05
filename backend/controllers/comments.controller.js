const asyncHandler = require("express-async-handler");
const {
  updateCommentValidation,
  commentValidation,
  Comment,
} = require("../models/comments.model");
const { User } = require("../models/users.model");

/**-------------------------------------------
 * @desc   Create Comment
 * @route /api/comments
 * @method POST
 * @access private (logged in users)
 -------------------------------------------*/

const createCommentCtrl = asyncHandler(async (req, res) => {
  const { error } = commentValidation(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const profile = await User.findById(req.user.id);
  const comment = await Comment.create({
    userName: profile.username,
    text: req.body.text,
    user: req.user.id,
    postId: req.body.postId,
  });
  res.status(201).json(comment);
});

/**-------------------------------------------
 * @desc   Get All Comments
 * @route /api/comments
 * @method GET
 * @access private (only admin)
 -------------------------------------------*/

const getAllComments = asyncHandler(async (req, res) => {
  const comments = await Comment.find().populate("user");
  res.status(200).json(comments);
});

/**-------------------------------------------
 * @desc  Delete Comment
 * @route /api/comments/:id
 * @method DELETE
 * @access private (only admin or owner)
 -------------------------------------------*/
const deleteComment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const comment = await Comment.findById(id);
  if (!comment) {
    return res.status(404).json({ message: "comment not found" });
  }
  if (req.user.isAdmin || req.user.id === comment.user.toString()) {
    await Comment.findByIdAndDelete(id);
    res.status(200).json({ message: "comment has been deleted" });
  } else {
    res.status(403).json({ message: "access denied, not allowed" });
  }
});

/**-----------------------------------------------
 * @desc    Update Comment
 * @route   /api/comments/:id
 * @method  PUT
 * @access  private (only owner of the comment)
 ------------------------------------------------*/
const updateCommentCtrl = asyncHandler(async (req, res) => {
  const { error } = updateCommentValidation(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const comment = await Comment.findById(req.params.id);
  if(!comment) {
    return res.status(404).json({ message: "comment not found" });
  }
  
  if(req.user.id !== comment.user.toString()) {
    return res.status(403)
      .json({ message: "access denied, only user himself can edit his comment" });
  }

  const updatedComment = await Comment.findByIdAndUpdate(req.params.id, {
    $set: {
      text: req.body.text,
    }
  }, { new : true });
  
  res.status(200).json(updatedComment);
});

module.exports = {
  createCommentCtrl,
  getAllComments,
  deleteComment,
  updateCommentCtrl
};
