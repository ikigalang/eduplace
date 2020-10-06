const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const fileSchema = new Schema({
  meta_data: {},
});

const File = mongoose.model("File", fileSchema);

module.exports = File;
