const userDB = require("../model/userdb");
const axios = require("axios");
const config = require("../../config.json");

const getAllData = async (req, res, render) => {
  var passingData = (data) => {
    return {
      username: data.username,
      name: data.name,
      email: data.email,
      phone: data.phone,
      pfp: data.pfp,
    };
  };

  const [casesResponse, userResponse, appointmentResponse] = await Promise.all([
    axios.get(`http://localhost:${config.port}/api/cases`, {
      params: { caseid: req.query.caseid },
    }),
    axios.get(`http://localhost:${config.port}/api/users`, {
      params: { userid: req.query.userid },
    }),
    axios.get(`http://localhost:${config.port}/api/appointments`, {
      params: { appointmentid: req.query.appointmentid },
    }),
  ]);

  if (req.query.caseid) {
    const data = casesResponse.data;
    userDB.findOne({ username: data.client }).then((clientinfo) => {
      data.clientInfo = passingData(clientinfo);
    });
    userDB.findOne({ username: data.attorney }).then((attorneyinfo) => {
      data.attorneyInfo = passingData(attorneyinfo);
    });
  } else {
    casesResponse.data.forEach((data) => {
      userDB.findOne({ username: data.client }).then((clientinfo) => {
        data.clientInfo = passingData(clientinfo);
      });
      userDB.findOne({ username: data.attorney }).then((attorneyinfo) => {
        data.attorneyInfo = passingData(attorneyinfo);
      });
    });
  }
  if (req.query.appointmentid) {
    const data = appointmentResponse.data;
    userDB.findOne({ username: data.client }).then((clientinfo) => {
      data.clientInfo = passingData(clientinfo);
    });
    userDB.findOne({ username: data.attorney }).then((attorneyinfo) => {
      data.attorneyInfo = passingData(attorneyinfo);
    });
  } else {
    appointmentResponse.data.forEach((data) => {
      userDB.findOne({ username: data.client }).then((clientinfo) => {
        data.clientInfo = passingData(clientinfo);
      });
      userDB.findOne({ username: data.attorney }).then((attorneyinfo) => {
        data.attorneyInfo = passingData(attorneyinfo);
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
