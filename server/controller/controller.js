var caseDB = require('../model/casedb');

exports.createcase = (req, res) => {
    if (!req.body) {
        res.status(400).send("Content can not be empty!");
        return;
    }
    const caseinfo = new caseDB({
        name: req.body.name,
        email: req.body.email,
        attorney: req.body.attorney,
        type: req.body.type,
        status: req.body.status
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
                res.status(500).send({ message: "Error retrieving case with id " + id })
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