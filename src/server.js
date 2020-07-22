const dotenv = require("dotenv");
const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

const userRouter = require("../src/router/userRouter");

dotenv.config();

const app = express();

app.use(bodyparser.json());
app.use(cors());
app.use(morgan("combined"));

app.use("/api/contacts", userRouter);

app.use((req, res, next) => {
  res.status(404).send({ data: { message: "Not Found" } });
});

module.exports = { app };
