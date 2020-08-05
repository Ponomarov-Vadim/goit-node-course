const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
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

const userModel = mongoose.model("contact", userSchema);

module.exports = userModel;
