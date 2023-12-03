if (process.env.NODE_ENV !== "production") require("dotenv").config();
const express = require("express");
const router = require("./routers/main");
const errorHandler = require("./middleware/errorhandler");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);
app.use(errorHandler);

module.exports = app;
