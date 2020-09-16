const router = require("express").Router();
let Course = require("../models/course.model");

// get all course
router.route("/").get((req, res) => {
  Course.find()
    .then((courses) => res.json(courses))
    .catch((error) => res.status(400).json("Error: " + error));
});

// add new course
router.route("/add").post((req, res) => {
  const title = req.body.title;
  const category = req.body.category;
  const rating = req.body.rating;
  const documentUrl = req.body.documentUrl;
  const posterUrl = req.body.posterUrl;
  const price = req.body.price;

  const newCourse = new Course({
    title,
    category,
    rating,
    documentUrl,
    posterUrl,
    price,
  });

  newCourse
    .save()
    .then(() => res.json("Course added!"))
    .catch((error) => res.status(400).json("Error: " + error));
});

// update course
router.route("/update/:id").post((req, res) => {
  Course.findById(req.params.id).then((course) => {
    course.title = req.body.title;
    course.category = req.body.category;
    course.rating = req.body.rating;
    course.documentUrl = req.body.documentUrl;
    course.posterUrl = req.body.posterUrl;
    course.price = req.body.price;

    course
      .save()
      .then(() => res.json("Course updated!"))
      .catch((error) => res.status(400).json("Error: " + error));
  });
});

// delete course
router.route("/delete/:id").delete((req, res) => {
  Course.findByIdAndDelete(req.params.id)
    .then(() => res.json("Course deleted!"))
    .catch((error) => res.status(400).json("Error: " + error));
});

module.exports = router;
