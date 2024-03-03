const axios = require('axios');
const config = require('../../config.json');

exports.homeRoutes = (req, res) => {
    axios.get(`http://localhost:${config.port}/api/cases`)
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
    axios.get(`http://localhost:${config.port}/api/users`)
        .then(function (response) {
            res.render('createcase', { users: response.data });
        })
        .catch(err => {
            res.send(err);
        })
}

exports.updatecase = (req, res) => {

    axios.all([
        axios.get(`http://localhost:${config.port}/api/cases`, { params: { id: req.query.id } }),
        axios.get(`http://localhost:${config.port}/api/users`)
    ])
        .then(axios.spread((casesResponse, userResponse) => {
            res.render('updatecase', { cases: casesResponse.data, users: userResponse.data });
        }))
        .catch(err => {
            res.send(err);
        });
}
exports.sign = (req, res) => {
    res.render('sign');
}