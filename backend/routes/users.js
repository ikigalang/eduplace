const router = require("express").Router();
const fs = require("fs");
let User = require("../models/users.model");

// get all user
router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((error) => res.status(400).json("Error: " + error));
});

// get user by id
router.route("/:id").get((req, res) => {
  User.findById(req.params.id)
    .then((users) => res.json(users))
    .catch((error) => res.status(400).json("Error: " + error));
});

// login user
router.route("/login").post((req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  User.find({
    email: email,
    password: password,
  })
    .then((user) =>
      user.length > 0
        ? res.json({
            status: true,
            _id: user[0]._id,
            isAdmin: user[0].isAdmin,
            name: user[0].name,
            email: user[0].email,
            photoUrl: user[0].photoUrl,
            coursePurchased: user[0].coursePurchased,
            courseOwned: user[0].courseOwned,
            cart: user[0].cart,
          })
        : res.json({ status: false })
    )
    .catch((error) => res.status(400).json("Error: " + error));
});

// add new user
router.route("/add").post((req, res) => {
  const isAdmin = req.body.isAdmin;
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const photoUrl = req.body.photoUrl;
  const coursePurchased = req.body.coursePurchased;
  const courseOwned = req.body.courseOwned;
  const cart = req.body.cart;

  const newUser = new User({
    isAdmin,
    name,
    email,
    password,
    photoUrl,
    coursePurchased,
    courseOwned,
    cart,
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
    user.coursePurchased = req.body.coursePurchased;
    user.courseOwned = req.body.courseOwned;
    user.cart = req.body.cart;

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

// upload image
router.route("/upload/image").post((req, res) => {
  const filename = "IMG-" + Date.now() + req.body.match[0];
  fs.writeFile(
    "./public/image/" + filename,
    req.body.base64,
    { encoding: "base64" },
    function (err) {
      console.log("File created");
      res.json({
        status: "Upload Success",
        filename: filename,
      });
    }
  );
});

// get image
router.route("/image/:refName").get((req, res, next) => {
  const options = {
    dotfiles: "deny",
    headers: {
      "x-timestamp": Date.now(),
      "x-sent": true,
    },
  };
  // perlu disesuaikan
  const baseUrl = process.env.DIR + "/image/";
  console.log(baseUrl);
  const fileName = baseUrl + req.params.refName;
  res.sendFile(fileName, options, function (error) {
    if (error) {
      next(error);
      res.status(400).json("Error: " + error);
    } else {
      console.log("Sent:", fileName);
    }
  });
});

module.exports = router;
