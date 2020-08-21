const { throwErr } = require("../helpers");

const mongoose = require("mongoose");

const contact = {
  get: async (data, { mongoDb }) => {
    const token = data.params.authorization;
    const { userModel } = mongoDb;

    const user = await userModel.findOne({ token });

    if (!user) {
      throwErr(401, { message: "Not authorized" });
    }

    return {
      status: 200,
      email: user.email,
      subscription: user.subscription,
    };
  },
};

module.exports = contact;
