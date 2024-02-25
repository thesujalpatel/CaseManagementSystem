const mongooes = require('mongoose');

const connectDB = () => {
    const conn = mongooes.connect(process.env.MONGOOES_URI).then(() => {
        console.log(`Database connected successfully on localhost`);
        // console.log(`Database connected successfully on ${conn.connection.host}`);
    }).catch((err) => {
        console.log(err);
    });
}

module.exports = connectDB;