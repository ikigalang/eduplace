const router = require("express").Router();
let Transactions = require("../models/transactions.model");

// get all transaction
router.route("/").get((req, res) => {
  Transactions.find()
    .then((transaction) => res.json(transaction))
    .catch((error) => res.status(400).json("Error: " + error));
});

// add new transaction
router.route("/add").post((req, res) => {
  const courseId = req.body.courseId;
  const accountId = req.body.accountId;
  const date = req.body.date;
  const price = req.body.price;
  const status = req.body.status;

  const newTransaction = new Transactions({
    courseId,
    accountId,
    date,
    price,
    status,
  });

  newTransaction
    .save()
    .then(() => res.json("Transaction added!"))
    .catch((error) => res.status(400).json("Error: " + error));
});

// update transaction
router.route("/update/:id").post((req, res) => {
  Transactions.findById(req.params.id).then((transaction) => {
    transaction.courseId = req.body.courseId;
    transaction.accountId = req.body.accountId;
    transaction.date = req.body.date;
    transaction.price = req.body.price;
    transaction.status = req.body.status;

    transaction
      .save()
      .then(() => res.json("Transaction updated!"))
      .catch((error) => res.status(400).json("Error: " + error));
  });
});

// delete transaction
router.route("/delete/:id").delete((req, res) => {
  Transactions.findByIdAndDelete(req.params.id)
    .then(() => res.json("Transaction deleted!"))
    .catch((error) => res.status(400).json("Error: " + error));
});
