const mongooes = require("mongoose");

var schema = new mongooes.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
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
    contentType: String,
    imageUrl: String,
  },
  settings: {
    type: Object,
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
const userDB = mongooes.model("userdb", schema);
module.exports = userDB;
