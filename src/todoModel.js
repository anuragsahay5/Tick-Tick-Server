const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  author: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  checked: {
    type: Boolean,
    default: false,
  },
});

const todoModel = mongoose.model("todo", userSchema);
module.exports = todoModel;
