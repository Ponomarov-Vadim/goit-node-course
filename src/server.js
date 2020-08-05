const dotenv = require("dotenv");
const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

const userRouter = require("./routers/userRouter");
const connectMongoDb = require("./database/");

dotenv.config();

const server = async (port, callback) => {
  try {
    const schemas = await connectMongoDb();

    const app = express();

    app.use(bodyparser.json());
    app.use(cors());
    app.use(morgan("combined"));

    app.use((req, res, next) => {
      req.mongoDb = schemas;
      next();
    });

    app.use("/api/contacts", userRouter);

    app.use((req, res, next) => {
      res.status(404).send({ data: { message: "Not Found" } });
    });

    app.listen(port, callback);
  } catch (error) {
    console.log(error);
  }
};

module.exports = server;
