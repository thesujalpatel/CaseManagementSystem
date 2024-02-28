var userDB = require('../model/userdb');
var caseDB = require('../model/casedb');

exports.createcase = (req, res) => {
    if (!req.body) {
        res.status(400).send("Content can not be empty!");
        return;
    }
    var emailFinder = userDB.findOne({ name: req.body.name });
    emailFinder.then(emailValue => {
        const caseinfo = new caseDB({
            name: req.body.name,
            email: emailValue.email,
            attorney: req.body.attorney,
            type: req.body.type,
            status: "On going",
            createDate: Date.now(),
            updateDate: null
        })
        caseinfo
            .save(caseinfo)
            .then(data => {
                // res.send(data);
                res.redirect('/admin');
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating a create operation"
                });
            });
    })
}
exports.findcase = (req, res) => {
    if (req.query.id) {
        const id = req.query.id;
        caseDB.findById(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: "Not found case with id " + id })
                } else {
                    res.send(data)
                }
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Error retrieving case with id " + id })
            })
    } else {
        caseDB.find()
            .then(cases => {
                res.send(cases)
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Error occurred while retrieving case information" })
            })
    }
}
exports.updatecase = (req, res) => {
    if (!req.body) {
        return res
            .status(400)
            .send({ message: "Data to update can not be empty" })
    }
    const id = req.params.id;
    var emailFinder = userDB.findOne({ name: req.body.name });
    emailFinder.then(emailValue => {
        const updateData = {
            ...req.body,
            updateDate: Date(Date.now()),
            email: emailValue.email
        };
        caseDB.findByIdAndUpdate(id, updateData, { useFindAndModify: false })
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: `Cannot update case with ${id}. Maybe case not found!` })
                } else {
                    res.send(data)
                }
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Error updating case information" })
            })
    });

}
exports.deletecase = (req, res) => {
    const id = req.params.id;
    caseDB.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot delete with id ${id}. Maybe id is wrong` })
            } else {
                res.send({
                    message: "Case was deleted successfully!"
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Could not delete case with id=" + id
            });
        });
}