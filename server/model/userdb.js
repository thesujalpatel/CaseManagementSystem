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
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  phone: {
    type: Array,
    required: true,
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
});
const userDB = mongooes.model("userdb", schema);
module.exports = userDB;
