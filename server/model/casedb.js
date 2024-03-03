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
    },
    hearing: {
        type: String,
        required: true
    },
    createDate: {
        type: Date,
        required: true
    },
    updateDate: {
        type: Date,
        required: false
    },
});
const caseDB = mongooes.model('casedb', schema);
module.exports = caseDB;