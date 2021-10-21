const mongoose = require("mongoose");
//const { isAlphanumeric, isNumeric } = require("validator");

const sauceSchema = mongoose.Schema({
  //STRING =
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    //validate: [isAlphanumeric],
    required: true,
    unique: true,
    // maxlength: 25,
    // minlength: 3,
    // trim: true,
  },
  manufacturer: {
    type: String,
    //validate: [isAlphanumeric],
    required: true,
    // maxlength: 50,
    // minlength: 3,
    // trim: true,
  },
  description: {
    type: String,
    //validate: [isAlphanumeric],
    required: true,
    // unique: true,
    // maxlength: 250,
    // minlength: 10,
    // trim: true,
  },
  mainPepper: {
    //! A VOIR PROBLEME : Nom unique alors que non selectionné ??? !!!!!!! //
    type: String,
    required: true,
    //validate: [isAlphanumeric],
    // unique: true,
    // maxlength: 50,
    // minlength: 3,
  },
  imageUrl: {
    type: String,
    required: true,
  },

  //NUMBER: =
  heat: {
    type: Number,
    required: true,
    //validate: [isNumeric],
    // max: 10,
    // min: 1,
  },
  likes: {
    type: Number,
    //validate: [isNumeric],
    //required: true,
  },
  dislikes: {
    type: Number,
    //validate: [isNumeric],
    //required: true,
  },

  //[string<userId>] =
  usersLiked: {
    type: [String],
    //required: true,
  },
  usersDisliked: {
    type: [String],
    //required: true,
  },
});

const SauceModel = mongoose.model("sauce", sauceSchema);

module.exports = SauceModel;

//STRING = userId: name: manufacturer: description: mainPepper: imageURL:
//NUMBER: = heat: likes: dislikes:
//[string<userId>] = usersLiked: usersDidliked:
