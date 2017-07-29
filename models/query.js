var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var querySchema = new Schema({
  term: String,
  date: Number
});

var Queries = mongoose.model("Queries", querySchema);

module.exports = Queries;