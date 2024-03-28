const userDB = require("../model/userdb");
const { themes } = require("../../settings.json");
const axios = require("axios");
const config = require("../../config.json");

const getAllData = async (req, res, render) => {
  const passingData = (data) => {
    return {
      username: data.username,
      name: data.name,
      email: data.email,
      phone: data.phone,
      pfp: data.pfp,
    };
  };

  const getCasesData = async () => {
    const casesResponse = await axios.get(
      `http://localhost:${config.port}/api/cases`,
      {
        params: { caseid: req.query.caseid },
      }
    );
    if (!req.query.caseid) {
      const casesData = casesResponse.data.map(async (data) => {
        const clientinfo = await userDB.findOne({ username: data.client });
        const attorneyinfo = await userDB.findOne({ username: data.attorney });

        data.clientInfo = passingData(clientinfo);
        data.attorneyInfo = passingData(attorneyinfo);

        return data;
      });
      return Promise.all(casesData);
    } else {
      const clientinfo = await userDB.findOne({
        username: casesResponse.data.client,
      });
      const attorneyinfo = await userDB.findOne({
        username: casesResponse.data.attorney,
      });

      casesResponse.data.clientInfo = passingData(clientinfo);
      casesResponse.data.attorneyInfo = passingData(attorneyinfo);

      return casesResponse.data;
    }
  };

  const getUsersData = async () => {
    const userResponse = await axios.get(
      `http://localhost:${config.port}/api/users`,
      {
        params: { userid: req.query.userid },
      }
    );

    return userResponse.data;
  };

  const getAppointmentsData = async () => {
    const appointmentResponse = await axios.get(
      `http://localhost:${config.port}/api/appointments`,
      {
        params: { appointmentid: req.query.appointmentid },
      }
    );

    const appointmentsData = appointmentResponse.data.map(async (data) => {
      const clientinfo = await userDB.findOne({ username: data.client });
      const attorneyinfo = await userDB.findOne({ username: data.attorney });

      data.clientInfo = passingData(clientinfo);
      data.attorneyInfo = passingData(attorneyinfo);

      return data;
    });

    return Promise.all(appointmentsData);
  };

  const [casesData, userData, appointmentsData] = await Promise.all([
    getCasesData(),
    getUsersData(),
    getAppointmentsData(),
  ]);

  userDB.findById(req.session.userId).then((firstperson) => {
    if (!req.cookies.theme) {
      res.cookie("theme", 0);
    }
    if (req.session.isAuth) {
      res.cookie("theme", firstperson.settings.theme);
    }
    var theme = themes[req.cookies.theme] || themes[0];
    var menu_open = req.cookies.menuopen == "true" ? true : false;
    res.render(render, {
      cases: casesData,
      users: userData,
      appointments: appointmentsData,
      firstperson: firstperson,
      config: config,
      theme: theme,
      menuopen: menu_open,
    });
  });
};

exports.landing = (req, res) => {
  getAllData(req, res, "landing");
};

exports.signup = (req, res) => {
  getAllData(req, res, "signup");
};

exports.signin = (req, res) => {
  getAllData(req, res, "signin");
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
