const express = require("express");
const app = express();
const errorMiddleware = require("./middlewares/error");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cloudinary = require("cloudinary");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//* Setting Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: proccess.env.CLOUDINARY_API_SECRET,
});

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
