const asyncHandler = require("express-async-handler");
const {
  validateCreatePost,
  Post,
  validateUpdatePost,
} = require("../models/posts.model");
const {
  cloudinaryUploadImage,
  cloudinaryRemoveImage,
} = require("../utils/cloudinary");
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

/**-------------------------------------------
 * @desc   Get All Posts
 * @route /api/posts
 * @method GET
 * @access public
 -------------------------------------------*/

const getAllPostsCtrl = asyncHandler(async (req, res) => {
  let { pageNumber, category } = req.query;
  category = category?.toLowerCase();
  const POST_PER_PAGE = 3;
  let posts;
  if (pageNumber && !category) {
    posts = await Post.find()
      .limit(POST_PER_PAGE)
      .skip(POST_PER_PAGE * (pageNumber - 1))
      .sort({ createdAt: -1 })
      .populate("user", ["-password"]);
  } else if (pageNumber && category) {
    posts = await Post.find({ category })
      .limit(POST_PER_PAGE)
      .skip(POST_PER_PAGE * (pageNumber - 1))
      .sort({ createdAt: -1 })
      .populate("user", ["-password"]);
  } else {
    posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate("user", ["-password"]);
  }

  return res.status(200).json(posts);
});

/**-------------------------------------------
 * @desc   Get Single Post
 * @route /api/posts/:id
 * @method GET
 * @access public
 -------------------------------------------*/

const getSinglePostCtrl = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id)
    .populate("user", ["-password"])
    .populate("comments");
  if (!post) {
    return res.status(404).json({ message: "post not found" });
  }
  return res.status(200).json(post);
});

/**-------------------------------------------
 * @desc   Get Post Count
 * @route /api/posts/count
 * @method GET
 * @access public
 -------------------------------------------*/
const getPostsCount = asyncHandler(async (req, res) => {
  const postCount = await Post.countDocuments();

  return res.status(200).json(postCount);
});

/**-------------------------------------------
 * @desc   Delete Post
 * @route /api/posts/:id
 * @method DELETE
 * @access private (admin and user himself)
 -------------------------------------------*/
const deletePostCtrl = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).json({ message: "post not found" });
  }
  if (req.user.isAdmin || req.user.id === post.user._id.toString()) {
    await Post.findByIdAndDelete(req.params.id);
    await cloudinaryRemoveImage(post.image.publicId);
    await Comment.deleteMany({ postId: post._id });
    res.status(200).json({
      message: "post has been deleted successfully",
      postId: post._id,
    });
  } else {
    res.status(403).json({ message: "access denied, forbidden" });
  }
});

/**-------------------------------------------
 * @desc   Update Post
 * @route /api/posts/:id
 * @method PUT
 * @access private (user himself)
 -------------------------------------------*/
const updatePostCtrl = asyncHandler(async (req, res) => {
  // 1. validation
  const { error } = validateUpdatePost(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  // 2. get post from DB
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).json({ message: "post not found" });
  }

  // 3. auth user
  if (post.user.toString() !== req.user.id) {
    return res
      .status(403)
      .json({ message: "access denied, you are not allowed" });
  }
  // 4. update post
  const updatedPost = await Post.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
      },
    },
    {
      new: true,
    }
  ).populate("user", ["-password"]);
  return res.status(200).json(updatedPost);
});

/**-------------------------------------------
 * @desc   Update Post Image
 * @route /api/posts/upload-image/:id
 * @method PUT
 * @access private (user himself)
 -------------------------------------------*/
const updatePostImageCtrl = asyncHandler(async (req, res) => {
  // 1. image Validation
  if (!req.file) {
    return res.status(400).json({ message: "no file provided" });
  }

  // 2. Get the post from DB
  const post = await Post.findById(req.params.id);

  // 3. auth user
  if (post.user.toString() !== req.user.id) {
    return res
      .status(403)
      .json({ message: "access denied, you are not allowed" });
  }

  // 4. Get the Path to the image
  const imagePath = path.join(__dirname, `../images/${req.file.filename}`);

  // 5. Upload to cloudinary
  const result = await cloudinaryUploadImage(imagePath); // will return object contains info about the image i will need the public_id and secure_url

  // 6. Delete the old  photo if exist
  if (post.image.publicId !== null) {
    await cloudinaryRemoveImage(post.image.publicId);
  }
  // 7. Change the photo field in the DB
  const updatedPost = await Post.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        image: {
          url: result.secure_url,
          publicId: result.public_id,
        },
      },
    },
    { new: true }
  );
  // 8. Send response to client
  res.status(200).json(updatedPost);

  // 9. Remove image from the server
  fs.unlinkSync(imagePath);
});

/**-------------------------------------------
 * @desc   Toggle Like
 * @route /api/posts/like/:id
 * @method PUT
 * @access private (logged in user)
 -------------------------------------------*/
const toggleLikeCtrl = asyncHandler(async (req, res) => {
  const { id: postId } = req.params;
  const loggedUser = req.user.id;
  let post = await Post.findById(postId);
  if (!post) {
    return res.status(404).json({
      message: "post not found",
    });
  }
  const isPostAlreadyLiked = post.likes.find(
    (user) => user.toString() === loggedUser
  );
  if (isPostAlreadyLiked) {
    post = await Post.findByIdAndUpdate(
      postId,
      {
        $pull: {
          likes: loggedUser,
        },
      },
      { new: true }
    );
  } else {
    post = await Post.findByIdAndUpdate(
      postId,
      {
        $push: {
          likes: loggedUser,
        },
      },
      { new: true }
    );
  }
  return res.status(200).json(post);
});
module.exports = {
  createPostCtrl,
  getAllPostsCtrl,
  getSinglePostCtrl,
  getPostsCount,
  deletePostCtrl,
  updatePostCtrl,
  updatePostImageCtrl,
  toggleLikeCtrl,
};
