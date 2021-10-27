const mongoose = require("mongoose");

const sauceSchema = mongoose.Schema({
  //STRING =
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  manufacturer: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  mainPepper: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },

  //NUMBER: =
  heat: {
    type: Number,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
  },
  dislikes: {
    type: Number,
    required: true,
  },

  //[string<userId>] =
  usersLiked: {
    type: [String],
    required: true,
  },
  usersDisliked: {
    type: [String],
    required: true,
  },
});

const SauceModel = mongoose.model("sauce", sauceSchema);

module.exports = SauceModel;
