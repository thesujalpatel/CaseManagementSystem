var appointmentDB = require("../model/appointmentdb");

exports.createappointment = (req, res) => {
  if (!req.body) {
    res.status(400).send("Content can not be empty!");
    return;
  }
  const appointmentinfo = new appointmentDB({
    attorney: req.body.attorney,
    client: req.body.client,
    date: req.body.date,
    description: req.body.description,
    createDate: Date.now(),
    updateDate: null,
  });
  appointmentinfo
    .save(appointmentinfo)
    .then((data) => {
      res.redirect("/admin");
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating a create operation",
      });
    });
};

exports.findappointment = (req, res) => {
  if (req.query.id) {
    const id = req.query.id;
    appointmentDB
      .findById(id)
      .then((data) => {
        if (!data) {
          res
            .status(404)
            .send({ message: "Not found appointment with id " + id });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message ||
            "SOme error occurred while retrieving appointment with id" + id,
        });
      });
  } else {
    appointmentDB
      .find()
      .then((appointments) => {
        res.send(appointments);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message ||
            "Error occurred while retrieving appointment information",
        });
      });
  }
};
