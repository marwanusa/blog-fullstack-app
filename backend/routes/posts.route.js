const router = require("express").Router();
const { createPostCtrl } = require("../controllers/posts.controller");
const { photoUpload } = require("../middlewares/photoUpload");
const { verifyToken } = require("../middlewares/verifyToken");



// /api/posts

router.route("/").post(photoUpload.single("image"),verifyToken,createPostCtrl)

module.exports = router;
