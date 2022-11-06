const app = require('./app');
const  dotenv = require('dotenv');
const connectDatabase = require('./config/database');

dotenv.config({path:'backend/config/config.env'})


//Handle Uncaught Exceptions
process.on('uncaughtException', err => {

console.log(`ERROR: ${err.stack}`)
console.log('Shutting down server due uncaught exception')
process.exit(1);
})

connectDatabase();

const server = app.listen(process.env.PORT, () => {

    console.log(`server started on port: ${process.env.PORT} in ${process.env.NODE_ENV} mode `);
});

//Unhandled Promises

process.on('unhandledRejection', err => {
console.log(`ERROR: ${err.message}`);
console.log('Shutting down the server due to Unhandled Promise rejection');
server.close(() => {
    process.exit(1);
})

})