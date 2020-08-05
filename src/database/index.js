const mongoose = require("mongoose");
const { throwErr } = require("../helpers");

const schemas = require("./models");

const connectMongoDb = async () => {
  const { MONGO_DB_URL, MONGO_DB_DATABASE } = process.env;
  console.log(MONGO_DB_URL + MONGO_DB_DATABASE);
  const connection = await mongoose.connect(MONGO_DB_URL + MONGO_DB_DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });

  if (connection) console.log("Connected to database");
  else throwErr(500, "Connection failed");

  return schemas;
};

module.exports = connectMongoDb;
