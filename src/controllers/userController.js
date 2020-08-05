const { throwErr } = require("../helpers");

const mongoose = require("mongoose");

const user = {
  getAll: async (_, { mongoDb }) => {
    const { userModel } = mongoDb;

    const users = await userModel.find();

    return {
      status: 200,
      users,
    };
  },

  get: async (data, { mongoDb }) => {
    const _id = data.params.id;
    const { userModel } = mongoDb;

    const user = await userModel.findById(_id);

    if (!user) {
      throwErr(404, "user not found");
    }

    return {
      status: 200,
      user,
    };
  },

  create: async (data, { mongoDb }) => {
    const { userModel } = mongoDb;

    const { name, email, phone, subscription, password, token = "" } = data;

    if (
      name === undefined ||
      email === undefined ||
      phone === undefined ||
      subscription === undefined ||
      password === undefined
    ) {
      throwErr(400, "Missing required name field");
    }

    await userModel.create({
      _id: mongoose.Types.ObjectId(),
      name,
      email,
      phone,
      subscription,
      password,
      token,
    });

    return {
      status: 201,
      user: { name, email, phone, subscription, password, token },
    };
  },

  update: async (data, { mongoDb }) => {
    const { userModel } = mongoDb;
    const _id = data.params.id;

    const { name, email, phone, subscription, password, token } = data;

    if (
      name === undefined ||
      email === undefined ||
      phone === undefined ||
      subscription === undefined ||
      password === undefined
    ) {
      throwErr(400, "Missing required name field");
    }

    const user = await userModel.findOneAndUpdate(
      { _id },
      {
        name,
        email,
        phone,
        subscription,
        password,
        token,
      }
    );

    return {
      status: 200,
      user,
    };
  },

  delete: async (data, { mongoDb }) => {
    const { userModel } = mongoDb;
    const _id = data.params.id;

    await userModel.deleteOne({ _id });

    return {
      status: 200,
      message: "Contact deleted",
    };
  },
};

module.exports = user;
