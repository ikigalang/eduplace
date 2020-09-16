const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const courseSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  category: [],
  rating: [
    {
      rate: {
        type: Number,
      },
      userId: {
        type: String,
      },
    },
  ],
  documentUrl: [],
  posterUrl: {
    type: String,
    trim: true,
    minlength: 3,
  },
  price: {
    type: Number,
  },
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
