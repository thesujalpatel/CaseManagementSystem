const axios = require('axios');
const port = process.env.PORT;

exports.homeRoutes = (req, res) => {
    axios.get(`http://localhost:${port}/api/cases`)
        .then(function (response) {
            res.render('index', { cases: response.data });
        })
}
exports.appointments = (req, res) => {
    res.render('appointments');
}

exports.cases = (req, res) => {
    res.render('cases');
}

exports.attorney = (req, res) => {
    res.render('attorney');
}

exports.features = (req, res) => {
    res.render('features');
}

exports.ftc = (req, res) => {
    res.render('ftc');
}

exports.aw = (req, res) => {
    res.render('aw');
}

exports.authentication = (req, res) => {
    res.render('authentication');
}

exports.miscellaneous = (req, res) => {
    res.render('miscellaneous');
}
exports.admin = (req, res) => {
    res.render('admin');
}

exports.createcase = (req, res) => {
    res.render('other/addcase');
}

exports.updatecase = (req, res) => {
    axios.get(`http://localhost:${port}/api/cases`, { params: { id: req.query.id } })
        .then(function (response) {
            res.render('other/updatecase', { cases: response.data });
        })
        .catch(err => {
            res.send(err);
        })
}