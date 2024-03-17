var userDB = require("../model/userdb");
const multer = require("multer");
const path = require("path");
const bcrypt = require("bcrypt");
const stroage = multer.diskStorage({
  destination: "./assets/uploads",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: stroage }).single("pfp");

exports.createuser = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.status(500).send({ message: "Error occurred while uploading image" });
    }

    if (!req.body) {
      res.status(400).send("Content can not be empty!");
      return;
    }
    // find user data from database to check user already exist or not
    userDB
      .findOne({ name: req.body.name })
      .then((existingUser) => {
        if (existingUser) {
          res.status(409).send({ message: "User already exists" });
        } else {
          var hashedPassword = bcrypt.hashSync(req.body.password, 12);
          const userinfo = new userDB({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            role: req.body.role,
            phone: [
              req.body.phone1,
              req.body.phone2 == "" ? null : req.body.phone2,
            ],
            pfp: {
              data: req.file.filename,
              contentType: path.extname(req.file.originalname),
              imageUrl: "uploads/" + req.file.filename,
            },
            createDate: Date.now(),
            updateDate: null,
          });
          userinfo
            .save()
            .then((data) => {
              res.redirect("/signin");
            })
            .catch((err) => {
              res.status(500).send({
                message:
                  err.message ||
                  "Some error occurred while creating a create operation",
              });
            });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Error occurred while checking user existence",
        });
      });
  });
};
exports.finduser = (req, res) => {
  if (req.query.id) {
    const id = req.query.id;
    userDB
      .findById(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: "Not found user with id " + id });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Error retrieving user with id " + id,
        });
      });
  } else {
    userDB
      .find()
      .then((users) => {
        res.send(users);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Error occurred while retrieving user information",
        });
      });
  }
};
exports.signin = (req, res) => {
  var infoFinder = userDB.findOne({ name: req.body.name });
  infoFinder.then((data) => {
    if (!data) {
      res.status(404).send({ message: "User not found" });
    } else {
      var isAuth = bcrypt.compareSync(req.body.password, data.password);
      if (isAuth) {
        req.session.isAuth = true;
        if (data.role === "admin") {
          req.session.isAdmin = true;
        }
        res.redirect("/dashboard");
      } else {
        res.status(401).send({ message: "Invalid credentials" });
      }
    }
  });
};
exports.signout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res
        .status(500)
        .send({ message: "Error occurred while destroying session" });
    } else {
      res.redirect("/signin");
    }
  });
};
