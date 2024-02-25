var Userdb = require('../model/model');

// create and save new user
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send("Content can not be empty!");
        return;
    }
    const user = new Userdb({
        name: req.body.name,
        email: req.body.email,
    })
    user
        .save(user)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating a create operation"
            });
        });

}