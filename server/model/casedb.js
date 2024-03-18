const mongooes = require("mongoose");

var schema = new mongooes.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  attorney: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  hearing: {
    type: String,
    required: true,
  },
  revenue: {
    type: Number,
    required: false,
  },
  pfp: {
    data: Buffer,
    contentType: String,
    imageUrl: String,
  },
  createDate: {
    type: Date,
    required: true,
  },
  updateDate: {
    type: Date,
    required: false,
  },
  isFinished: {
    type: Boolean,
    required: true,
  },
});
const caseDB = mongooes.model("casedb", schema);
module.exports = caseDB;
