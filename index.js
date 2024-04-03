const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const authorRoutes = require("./src/routes/author.route");
const BookRoutes = require("./src/routes/book.route");
const connectDB = require("./src/config/connect");
const port = 8080;

// kết nối mongodb
connectDB();
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());
app.use(morgan("common"));

app.use("/api/v1/author", authorRoutes);
app.use("/api/v1/book", BookRoutes);

app.listen(port, () => {
  console.log("start server");
});
