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
      avatar: user.avatarURL,
    };
  },

  update: async (data, { mongoDb }) => {
    const token = data.params.authorization;
    const { userModel } = mongoDb;
    const { HOST } = process.env;
    const {
      email,
      subscription,
      file: { originalname },
    } = data;

    const user = await userModel.findOne({ token });

    if (!user) {
      throwErr(401, { message: "Not authorized" });
    }

    if (!email || !originalname || !subscription) {
      throwErr(400, "Missing required name field");
    }

    const avatarURL = `${HOST}/images/${originalname}`;
    await userModel.findOneAndUpdate(
      { token },
      {
        email,
        avatarURL,
        subscription,
      }
    );
    return {
      status: 200,
      email,
      subscription,
      avatarURL,
    };
  },
};

module.exports = contact;
