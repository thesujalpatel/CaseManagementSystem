const express = require("express");
const session = require("express-session");
const mongoSession = require("connect-mongodb-session")(session);
const config = require("../../config.json");
const route = express.Router();

const sessionObj = () => {
  var store = new mongoSession({
    uri: config.mongo_uri,
    collection: "sessiondbs",
  });
};
module.exports = sessionObj;
