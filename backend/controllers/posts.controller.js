const asyncHandler = require("express-async-handler");
const { validateCreatePost, Post } = require("../models/posts.model");
const { cloudinaryUploadImage } = require("../utils/cloudinary");
const path = require("path");
const fs = require("fs");

/**-------------------------------------------
 * @desc   Create New Post
 * @route /api/posts
 * @method POST
 * @access private (only logged in user)
 -------------------------------------------*/
const createPostCtrl = asyncHandler(async (req, res) => {
  // 1. body validation
  const { error } = validateCreatePost(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  // 2. Image Validation
  if (!req.file) {
    return res.status(400).json({ message: "no file provided" });
  }
  // 3. Get Image Path
  const imagePath = path.join(__dirname, `../images/${req.file.filename}`);

  // 4. Upload to cloudinary
  const result = await cloudinaryUploadImage(imagePath);

  // 5. save post in the database
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    user: req.user.id,
    image: {
      url: result.secure_url,
      publicId: result.public_id,
    },
  });
  await post.save();

  // 6. Send response to client
  res.status(200).json({ message: "Post Created Successfuly", post: post });

  // 8. Remove image from the server
  fs.unlinkSync(imagePath);
});

module.exports = {
  createPostCtrl,
};
