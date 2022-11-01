const mongoose = require('mongoose');
const  dotenv = require('dotenv');

const connectDatabase = () => {
    mongoose.connect(process.env.DATABASE_LOCAL_URI, {
        useNewUrlParser: true,
    }).then(con => {
        console.log(`MongoDB Database Connected with HOST: ${con.connection.host}`);
    });
};

module.exports = connectDatabase