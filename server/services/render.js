const axios = require("axios");
const config = require("../../config.json");

exports.landing = (req, res) => {
  res.render("landing");
};
exports.dashboard = (req, res) => {
  axios
    .get(`http://localhost:${config.port}/api/cases`)
    .then(function (response) {
      res.render("dashboard", { cases: response.data, config: config });
    });
};
exports.appointments = (req, res) => {
  res.render("appointments", { config: config });
};

exports.cases = (req, res) => {
  res.render("cases", { config: config });
};

exports.attorney = (req, res) => {
  res.render("attorney", { config: config });
};

exports.features = (req, res) => {
  res.render("features", { config: config });
};

exports.ftc = (req, res) => {
  res.render("ftc", { config: config });
};

exports.aw = (req, res) => {
  res.render("aw", { config: config });
};

exports.authentication = (req, res) => {
  res.render("authentication", { config: config });
};

exports.miscellaneous = (req, res) => {
  res.render("miscellaneous", { config: config });
};
exports.admin = (req, res) => {
  res.render("admin", { config: config });
};

exports.createcase = (req, res) => {
  axios
    .get(`http://localhost:${config.port}/api/users`)
    .then(function (response) {
      res.render("createcase", { users: response.data });
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.updatecase = (req, res) => {
  axios
    .all([
      axios.get(`http://localhost:${config.port}/api/cases`, {
        params: { id: req.query.id },
      }),
      axios.get(`http://localhost:${config.port}/api/users`),
    ])
    .then(
      axios.spread((casesResponse, userResponse) => {
        res.render("updatecase", {
          cases: casesResponse.data,
          users: userResponse.data,
        });
      })
    )
    .catch((err) => {
      res.send(err);
    });
};

exports.signup = (req, res) => {
  res.render("signup");
};

exports.signin = (req, res) => {
  res.render("signin");
};
