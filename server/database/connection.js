const mongooes = require('mongoose');
const config = require('../../config.json');

const connectDB = async () => {
    try {
        const con = await mongooes.connect(config.mongo_uri);

        console.log(`Database connected successfully to ${con.connection.host}`);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB;