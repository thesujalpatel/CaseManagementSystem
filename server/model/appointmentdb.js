const mongooes = require("mongoose");

var schema = new mongooes.Schema({
  attorney: {
    type: String,
    required: true,
  },
  client: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createDate: {
    type: Date,
    required: true,
  },
  updateDate: {
    type: Date,
    required: false,
  },
});
const appointmentDB = mongooes.model("appointmentdb", schema);
module.exports = appointmentDB;
