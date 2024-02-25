const mongooes = require('mongoose');

var schema = new mongooes.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
});
const Userdb = mongooes.model('userdb', schema);
module.exports = Userdb;