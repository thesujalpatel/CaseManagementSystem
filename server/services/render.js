const userDB = require("../model/userdb");
const axios = require("axios");
const config = require("../../config.json");

exports.landing = (req, res) => {
  userDB.findById(req.session.userId).then((firstperson) => {
    res.render("landing", { config: config, firstperson: firstperson });
  });
};

exports.dashboard = (req, res) => {
  axios
    .all([
      axios.get(`http://localhost:${config.port}/api/cases`, {
        params: { id: req.query.id },
      }),
      axios.get(`http://localhost:${config.port}/api/users`),
    ])
    .then(
      axios.spread((casesResponse, userResponse) => {
        userDB.findById(req.session.userId).then((firstperson) => {
          res.render("dashboard", {
            cases: casesResponse.data,
            users: userResponse.data,
            config: config,
            firstperson: firstperson,
          });
        });
      })
    );
};

exports.appointments = (req, res) => {
  userDB.findById(req.session.userId).then((firstperson) => {
    res.render("appointments", { config: config, firstperson: firstperson });
  });
};

exports.cases = (req, res) => {
  axios
    .all([
      axios.get(`http://localhost:${config.port}/api/cases`),
      axios.get(`http://localhost:${config.port}/api/users`),
    ])
    .then(
      axios.spread((casesResponse, userResponse) => {
        userDB.findById(req.session.userId).then((firstperson) => {
          res.render("cases", {
            cases: casesResponse.data,
            users: userResponse.data,
            config: config,
            firstperson: firstperson,
          });
        });
      })
    );
};

exports.attorney = (req, res) => {
  userDB.findById(req.session.userId).then((firstperson) => {
    res.render("attorney", { config: config, firstperson: firstperson });
  });
};

exports.features = (req, res) => {
  userDB.findById(req.session.userId).then((firstperson) => {
    res.render("features", { config: config, firstperson: firstperson });
  });
};

exports.ftc = (req, res) => {
  userDB.findById(req.session.userId).then((firstperson) => {
    res.render("ftc", { config: config, firstperson: firstperson });
  });
};

exports.aw = (req, res) => {
  userDB.findById(req.session.userId).then((firstperson) => {
    res.render("aw", { config: config, firstperson: firstperson });
  });
};

exports.authentication = (req, res) => {
  userDB.findById(req.session.userId).then((firstperson) => {
    res.render("authentication", { config: config, firstperson: firstperson });
  });
};

exports.miscellaneous = (req, res) => {
  userDB.findById(req.session.userId).then((firstperson) => {
    res.render("miscellaneous", { config: config, firstperson: firstperson });
  });
};
exports.admin = (req, res) => {
  userDB.findById(req.session.userId).then((firstperson) => {
    res.render("admin", { config: config, firstperson: firstperson });
  });
};

exports.signup = (req, res) => {
  userDB.findById(req.session.userId).then((firstperson) => {
    res.render("signup", { config: config, firstperson: firstperson });
  });
};

exports.signin = (req, res) => {
  userDB.findById(req.session.userId).then((firstperson) => {
    res.render("signin", { config: config, firstperson: firstperson });
  });
};

exports.createappointment = (req, res) => {
  axios
    .all([
      axios.get(`http://localhost:${config.port}/api/users`),
      axios.get(`http://localhost:${config.port}/api/appointments`),
    ])
    .then(
      axios.spread((userResponse, appointmentResponse) => {
        userDB.findById(req.session.userId).then((firstperson) => {
          res.render("newappointment", {
            users: userResponse.data,
            appointments: appointmentResponse.data,
            config: config,
            firstperson: firstperson,
          });
        });
      })
    );
};

exports.createcase = (req, res) => {
  axios
    .get(`http://localhost:${config.port}/api/users`)
    .then(function (response) {
      userDB.findById(req.session.userId).then((firstperson) => {
        res.render("createcase", {
          users: response.data,
          config: config,
          firstperson: firstperson,
        });
      });
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
        userDB.findById(req.session.userId).then((firstperson) => {
          res.render("updatecase", {
            cases: casesResponse.data,
            users: userResponse.data,
            config: config,
            firstperson: firstperson,
          });
        });
      })
    );
};

exports.casedetail = (req, res) => {
  axios
    .get(`http://localhost:${config.port}/api/cases`, {
      params: { id: req.query.id },
    })
    .then(function (casedata) {
      userDB.findById(req.session.userId).then((firstperson) => {
        res.render("casedetail", {
          data: casedata.data,
          config: config,
          firstperson: firstperson,
        });
      });
    });
};
