const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  courseId: {
    type: String,
    trim: true,
    require: true,
  },
  accountId: {
    type: String,
    trim: true,
    require: true,
  },
  date: {
    type: Date,
    require: true,
  },
  price: {
    type: Number,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
});

const Transactions = mongoose.model("Transaction", transactionSchema);

module.exports = Transactions;
