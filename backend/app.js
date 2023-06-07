const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middlewares/errors");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");

const cors = require("cors");
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use(cookieParser());
app.use(fileUpload());

// import all routes

const products = require("./routes/product");
const auth = require("./routes/auth");
const order = require("./routes/order");

app.use("/api/v1", products);
app.use("/api/v1", auth);
app.use("/api/v1", order);
// Enable CORS for all routes

// middlewares to handle errors
app.use(errorMiddleware);

module.exports = app;
