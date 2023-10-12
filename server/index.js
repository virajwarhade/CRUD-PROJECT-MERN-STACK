const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const UserModel = require("./models/users");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/crud_app");

app.post("/CreateUser", (req, res) => {
  UserModel.create(req.body)
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.get("/", (req, res) => {
  UserModel.find({})
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.listen(3001, () => {
  console.log("running on port 3001");
});

app.get("/getUser/:id", (req, res) => {
  const id = req.params.id;

  UserModel.findById({ _id: id })
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.put("/updateUser/:id", (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndUpdate(
    { _id: id },
    { Name: req.body.Name, Email: req.body.Email, Age: req.body.Age }
  )

    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});











app.delete("/deleteUser/:id", (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndDelete({ _id: id })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});
