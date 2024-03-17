const express = require("express");
const session = require("express-session");
const route = express.Router();
const config = require("../../config.json");
const mongoSession = require("connect-mongodb-session")(session);

const services = require("../services/render");

const caseController = require("../controller/case");
const userController = require("../controller/user");
const configController = require("../controller/config");

var store = new mongoSession({
  uri: config.mongo_uri,
  collection: "sessiondbs",
});

route.use(
  session({
    secret: config.session_secret,
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);
const isAuth = (req, res, next) => {
  if (req.session.isAuth) {
    next();
  } else {
    res.redirect("/signin");
  }
};
const isAdmin = (req, res, next) => {
  if (req.session.isAdmin) {
    next();
  } else {
    res.redirect("/dashboard");
  }
};
route.get("/", services.landing);
route.get("/dashboard", isAuth, services.dashboard);
route.get("/appointments", isAuth, services.appointments);
route.get("/cases", isAuth, services.cases);
route.get("/attorney", isAuth, services.attorney);
route.get("/features", isAuth, services.features);
route.get("/ftc", isAuth, services.ftc);
route.get("/aw", isAuth, services.aw);
route.get("/authentication", isAuth, services.authentication);
route.get("/miscellaneous", isAuth, services.miscellaneous);

route.get("/admin", isAuth, isAdmin, services.admin);
route.get("/admin/createcase", isAuth, isAdmin, services.createcase);
route.get("/admin/updatecase", isAuth, isAdmin, services.updatecase);

route.get("/signup", services.signup);
route.get("/signin", services.signin);

// API
route.post("/api/cases", caseController.createcase);
route.get("/api/cases", caseController.findcase);
route.put("/api/cases/:id", caseController.updatecase);
route.delete("/api/cases/:id", caseController.deletecase);

route.post("/api/users", userController.createuser);
route.get("/api/users", userController.finduser);
route.post("/signin", userController.signin);
route.post("/signout", userController.signout);

route.get("/config", configController.config);

route.use((req, res) => {
  res.status(404).render("404");
});

module.exports = route;
