const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Schema } = mongoose;

const contactSchema = new Schema({
  _id: { type: Schema.Types.ObjectId },
  name: { type: Schema.Types.String },
  email: {
    type: Schema.Types.String,
    validate: {
      validator: (email) => email.indexOf("@") > -1,
      message: "Invalid email format",
    },
  },
  phone: { type: Schema.Types.String },
  subscription: { type: Schema.Types.String },
  password: { type: Schema.Types.String },
  token: { type: Schema.Types.String },
});

const contactModel = mongoose.model("contact", contactSchema);

module.exports = contactModel;
