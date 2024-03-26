var userDB = require("../model/userdb");
var caseDB = require("../model/casedb");

exports.createcase = (req, res) => {
  if (!req.body) {
    res.status(400).send("Content can not be empty!");
    return;
  }
  const caseinfo = new caseDB({
    client:  req.body.clientname ,
    attorney:  req.body.attorneyname ,
    type: req.body.type,
    description: req.body.description,
    status: "ongoing",
    hearing: "no",
    revenue: null,
    createDate: Date.now(),
    updateDate: null,
    isFinished: false,
  });
  caseinfo
    .save(caseinfo)
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
exports.findcase = (req, res) => {
  if (req.query.caseid) {
    const id = req.query.caseid;
    caseDB
      .findById(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: "Not found case with id " + id });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Error retrieving case with id " + id,
        });
      });
  } else {
    caseDB
      .find()
      .then((cases) => {
        res.send(cases);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Error occurred while retrieving case information",
        });
      });
  }
};
exports.updatecase = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Data to update can not be empty" });
  }
  const id = req.params.caseid;
  var infoFinder = userDB.findOne({ username: req.body.username });
  infoFinder.then((info) => {
    const updateData = {
      ...req.body,
      updateDate: Date(Date.now()),
      isFinish: req.body.status == "ongoing" ? false : true,
      hearing:
        req.body.hearing == "0" || !req.body.hearing ? "no" : req.body.hearing,
    };
    caseDB
      .findByIdAndUpdate(id, updateData, { useFindAndModify: false })
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update case with ${id}. Maybe case not found!`,
          });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res
          .status(500)
          .send({ message: err.message || "Error updating case information" });
      });
  });
};
exports.deletecase = (req, res) => {
  const id = req.params.caseid;
  caseDB
    .findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: `Cannot delete with id ${id}. Maybe id is wrong` });
      } else {
        res.send({
          message: "Case was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete case with id=" + id,
      });
    });
};
