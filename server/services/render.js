const userDB = require("../model/userdb");
const axios = require("axios");
const config = require("../../config.json");

let getAllData = (req, res, render) => {
  axios
    .all([
      axios.get(`http://localhost:${config.port}/api/cases`, {
        params: { id: req.query.id },
      }),
      axios.get(`http://localhost:${config.port}/api/users`, {
        params: { id: req.query.user_id },
      }),
      axios.get(`http://localhost:${config.port}/api/appointments`, {
        params: { id: req.query.appointment_id },
      }),
    ])
    .then(
      axios.spread((casesResponse, userResponse, appointmentResponse) => {
        if (req.query.id) {
          const data = casesResponse.data;
          userDB.findOne({ username: data.client }).then((clientinfo) => {
            data.clientInfo = {
              username: clientinfo.username,
              name: clientinfo.name,
              email: clientinfo.email,
              phone: clientinfo.phone,
              pfp: clientinfo.pfp,
            };
          });
          userDB.findOne({ username: data.attorney }).then((attorneyinfo) => {
            data.attorneyInfo = {
              username: attorneyinfo.username,
              name: attorneyinfo.name,
              email: attorneyinfo.email,
              phone: attorneyinfo.phone,
              pfp: attorneyinfo.pfp,
            };
          });
        } else {
          casesResponse.data.forEach((data) => {
            userDB.findOne({ username: data.client }).then((clientinfo) => {
              data.clientInfo = {
                username: clientinfo.username,
                name: clientinfo.name,
                email: clientinfo.email,
                phone: clientinfo.phone,
                pfp: clientinfo.pfp,
              };
            });
            userDB.findOne({ username: data.attorney }).then((attorneyinfo) => {
              data.attorneyInfo = {
                username: attorneyinfo.username,
                name: attorneyinfo.name,
                email: attorneyinfo.email,
                phone: attorneyinfo.phone,
                pfp: attorneyinfo.pfp,
              };
            });
          });
        }
        if (req.query.user_id) {
          const data = userResponse.data;
          userDB.findOne({ username: data.client }).then((clientinfo) => {
            data.clientInfo = {
              username: clientinfo.username,
              name: clientinfo.name,
              email: clientinfo.email,
              phone: clientinfo.phone,
              pfp: clientinfo.pfp,
            };
          });
          userDB.findOne({ username: data.attorney }).then((attorneyinfo) => {
            data.attorneyInfo = {
              username: attorneyinfo.username,
              name: attorneyinfo.name,
              email: attorneyinfo.email,
              phone: attorneyinfo.phone,
              pfp: attorneyinfo.pfp,
            };
          });
        } else {
          appointmentResponse.data.forEach((data) => {
            userDB.findOne({ username: data.client }).then((clientinfo) => {
              data.clientInfo = {
                username: clientinfo.username,
                name: clientinfo.name,
                email: clientinfo.email,
                phone: clientinfo.phone,
                pfp: clientinfo.pfp,
              };
            });
            userDB.findOne({ username: data.attorney }).then((attorneyinfo) => {
              data.attorneyInfo = {
                username: attorneyinfo.username,
                name: attorneyinfo.name,
                email: attorneyinfo.email,
                phone: attorneyinfo.phone,
                pfp: attorneyinfo.pfp,
              };
            });
          });
        }
        userDB.findById(req.session.userId).then((firstperson) => {
          res.render(render, {
            cases: casesResponse.data,
            users: userResponse.data,
            appointments: appointmentResponse.data,
            firstperson: firstperson,
            config: config,
          });
        });
      })
    );
};

exports.landing = (req, res) => {
  res.render("landing", { config: config });
};

exports.signup = (req, res) => {
  res.render("signup", { config: config });
};

exports.signin = (req, res) => {
  res.render("signin", { config: config });
};

exports.dashboard = (req, res) => {
  getAllData(req, res, "dashboard");
};

exports.appointments = (req, res) => {
  getAllData(req, res, "appointments");
};

exports.cases = (req, res) => {
  getAllData(req, res, "cases");
};

exports.attorney = (req, res) => {
  getAllData(req, res, "attorney");
};

exports.features = (req, res) => {
  getAllData(req, res, "features");
};

exports.ftc = (req, res) => {
  getAllData(req, res, "ftc");
};

exports.aw = (req, res) => {
  getAllData(req, res, "aw");
};

exports.authentication = (req, res) => {
  getAllData(req, res, "authentication");
};

exports.miscellaneous = (req, res) => {
  getAllData(req, res, "miscellaneous");
};
exports.admin = (req, res) => {
  getAllData(req, res, "admin");
};

exports.createappointment = (req, res) => {
  getAllData(req, res, "newappointment");
};

exports.createcase = (req, res) => {
  getAllData(req, res, "createcase");
};

exports.updatecase = (req, res) => {
  getAllData(req, res, "updatecase");
};

exports.casedetail = (req, res) => {
  getAllData(req, res, "casedetail");
};
