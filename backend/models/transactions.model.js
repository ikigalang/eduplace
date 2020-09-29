const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const transactionSchema = new Schema(
  {
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
    price: {
      type: Number,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Transactions = mongoose.model("Transaction", transactionSchema);

module.exports = Transactions;
