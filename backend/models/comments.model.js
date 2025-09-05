const Joi = require("joi");
const mongoose = require("mongoose");

const CommentsSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", CommentsSchema);

// Create Comment Validation

function commentValidation(obj) {
  const schema = Joi.object({
    text: Joi.string().required().label("Text"),
    postId:Joi.string().trim().required().label("Post ID"),
  });
  return schema.validate(obj)
}

// Update Comment Validation

function updateCommentValidation(obj) {
  const schema = Joi.object({
    text: Joi.string().required(),
  });
  return schema.validate(obj)
}



module.exports = {
  Comment,
  commentValidation,
  updateCommentValidation

}
