const mongoose = require("mongoose");
const schemas = require("./models");
const { throwErr } = require("../helpers");

const setupMongoDb = async () => {
  const { MONGO_DB_URL, MONGO_DB_DATABASE } = process.env;

  const connection = await mongoose.connect(MONGO_DB_URL + MONGO_DB_DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });

  if (connection) console.log("Connected to database successful");
  else throwErr(500, "Connection failed");

  return schemas;
};

module.exports = { setupMongoDb };
