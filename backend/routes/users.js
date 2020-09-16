const router = require("express").Router();
let User = require("../models/users.model");

// get all user
router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((error) => res.status(400).json("Error: " + error));
});

// add new user
router.route("/add").post((req, res) => {
  const isAdmin = req.body.isAdmin;
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const photoUrl = req.body.photoUrl;
  const balance = req.body.balance;
  const coursePurchased = req.body.coursePurchased;
  const courseOwned = req.body.courseOwned;

  const newUser = new User({
    isAdmin,
    name,
    email,
    password,
    photoUrl,
    balance,
    coursePurchased,
    courseOwned,
  });

  newUser
    .save()
    .then(() => res.json("User added!"))
    .catch((error) => res.status(400).json("Error: " + error));
});

// update user
router.route("/update/:id").post((req, res) => {
  User.findById(req.params.id).then((user) => {
    user.isAdmin = req.body.isAdmin;
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;
    user.photoUrl = req.body.photoUrl;
    user.balance = req.body.balance;
    user.coursePurchased = req.body.coursePurchased;
    user.courseOwned = req.body.courseOwned;

    user
      .save()
      .then(() => res.json("User updated!"))
      .catch((error) => res.status(400).json("Error: " + error));
  });
});

// delete user
router.route("/delete/:id").delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json("User deleeted!"))
    .catch((error) => res.status(400).json("Error: " + error));
});

module.exports = router;
