const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const courseSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: [
    {
      label: {
        type: String,
      },
      value: {
        type: String,
      },
    },
  ],
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
  document: [
    {
      documentTitle: {
        type: String,
      },
      documentUrl: {
        type: String,
      },
    },
  ],
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
