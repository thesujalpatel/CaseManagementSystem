const mongooes = require('mongoose');

const connectDB = async () => {
    try {
        // mongodb connection string
        const con = await mongooes.connect(process.env.MONGOOSE_URI);

        console.log(`Database connected successfully`);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB;