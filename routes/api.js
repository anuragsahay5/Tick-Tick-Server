const express = require("express");
require("../src/dbConnect");
const todoModel = require("../src/todoModel");
const userModel = require("../src/userModel");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    let result = await userModel.findOne({ email, password });
    if (!result) {
      return res.status(404).send("Invalid Username or Password!");
    }
    const token = jwt.sign(result._id.valueOf(), process.env.JWt_SECRET_KEY);
    res.send({ token, username: result.username });
    
  } catch (error) {
    res.send(error);
  }
});

router.post("/register", async (req, res) => {
  const { email, username, password } = req.body;

  try {
    let result = await userModel.findOne({ email });
    if (result) {
      res.status(409).send("Email Already Registered");
    } else {
      let insert = await userModel.insertMany({ email, username, password });
      const token = jwt.sign(
        insert[0]._id.valueOf(),
        process.env.JWt_SECRET_KEY
      );
      res.send({ token, username: insert[0].username });
    }
  } catch (error) {
    res.send(error);
  }
});

router.post("/getTodos", auth, async (req, res) => {
  try {
    const author = req.user;
    let result = await todoModel.find({ author }, { __v: 0 }).sort({ _id: -1 });
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

router.post("/addTodo", auth, async (req, res) => {
  try {
    let result = await todoModel.insertMany({
      author: req.user,
      description: req.body.description,
    });
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});
router.post("/deleteTodo", auth, async (req, res) => {
  try {
    let result = await todoModel.deleteOne({
      _id: req.body.todoId,
      author: req.user,
    });
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});
router.post("/clickTodo", auth, async (req, res) => {
  try {
    let result = await todoModel.updateOne(
      { _id: req.body.todoId, author: req.user },
      { $set: { checked: req.body.checked ? true : false } }
    );
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

router.post("/", async (req, res) => {
  console.log(req.header("data").SERVER_BASE_URL);
  res.send("hi");
});

module.exports = router;
