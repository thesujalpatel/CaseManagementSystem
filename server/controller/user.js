var userDB = require("../model/userdb");

exports.createuser = (req, res) => {
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
        // Continue with user creation logic
        const userinfo = new userDB({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          role: req.body.role,
          phone: [
            req.body.phone1,
            req.body.phone2 == "" ? null : req.body.phone2,
          ],
          // image: {
          //     data: fs.readFileSync(path.join(__dirname + '/assets/img' + req.file.filename)),
          //     contentType: 'png'
          // },
          createDate: Date.now(),
          updateDate: null,
        });
        userinfo
          .save()
          .then((data) => {
            res.redirect("/");
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
        message: err.message || "Error occurred while checking user existence",
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
      .then((cases) => {
        res.send(cases);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Error occurred while retrieving user information",
        });
      });
  }
};
