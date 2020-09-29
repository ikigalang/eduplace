const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 8020;

// middleware
app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully.");
});

// router
const usersRouter = require("./routes/users");
const courseRouter = require("./routes/course");
const transactionRouter = require("./routes/transaction");

app.use("/users", usersRouter);
app.use("/course", courseRouter);
app.use("/transaction", transactionRouter);

app.listen(port, () => {
  console.log(`Server is runnning on port: ${port}`);
});
