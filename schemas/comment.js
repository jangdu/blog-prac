const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const commentsSchema = new mongoose.Schema(
  {
    commentId: {
      type: String,
      default: uuidv4,
      unique: true,
    },
    nickname: {
      type: String,
      require: true,
    },
    content: {
      type: String,
      require: true,
    },
    postId: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Comments", commentsSchema);
