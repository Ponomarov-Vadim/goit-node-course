const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const { contact, auth, user } = require("./routers/");
const { setupMongoDb } = require("./database/");
const { upload } = require("./services/multer");

dotenv.config({ path: __dirname + "/../.env" });

const server = async (port, callback) => {
  try {
    const mongoDb = await setupMongoDb();

    const app = express();

    app.use(express.json());
    app.use(cors());
    app.use(morgan("combined"));

    app.use((req, res, next) => {
      req.mongoDb = mongoDb;
      next();
    });

    app.use("/images", express.static(__dirname + "./../public/images"));

    app.use(upload.single("avatar"));

    app.use("/api/contacts", contact);
    app.use("/auth", auth);
    app.use("/users", user);

    app.use((req, res, next) => {
      res.status(404).send({ data: { message: "Not Found" } });
    });

    app.listen(port, callback);
  } catch (error) {
    console.log(error);
  }
};

module.exports = server;
