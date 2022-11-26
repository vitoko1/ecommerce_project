const express = require("express");
const app = express();
const errorMiddleware = require("./middlewares/error");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require('express-fileupload');

// app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cookieParser());
// app.use(fileUpload());

app.use(express.json({limit: '50mb'}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit:50000}));
app.use(cookieParser());
app.use(fileUpload())


const products = require("./routes/product");
const auth = require("./routes/auth");
const order = require("./routes/order");

const path = require("path");

app.use("/api/v1", products);
app.use("/api/v1", auth);
app.use("/api/v1", order);

//handle errors
app.use(errorMiddleware);

module.exports = app;
