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
    attorney: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
});
const casesDB = mongooes.model('casedb', schema);
module.exports = casesDB;