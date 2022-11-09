const express = require("express");
const app = express();
const errorMiddleware = require("./middlewares/error");

app.use(express.json());

const products = require("./routes/product");
const auth = require("./routes/auth");

app.use("/api/v1", products);
app.use("/api/v1", auth);

//handle errors
app.use(errorMiddleware);

module.exports = app;
