const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const postsSchema = new mongoose.Schema(
  {
    postId: {
      type: String,
      default: uuidv4,
    },
    user: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    title: {
      type: String,
      require: true,
    },
    content: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Posts", postsSchema);
