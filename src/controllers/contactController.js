const { throwErr } = require("../helpers");

const mongoose = require("mongoose");

const contact = {
  getAll: async (_, { mongoDb }) => {
    const { contactModel } = mongoDb;

    const contacts = await contactModel.find();

    return {
      status: 200,
      contacts,
    };
  },

  get: async (data, { mongoDb }) => {
    const _id = data.params.id;
    const { contactModel } = mongoDb;

    const contact = await contactModel.findById(_id);

    if (!contact) {
      throwErr(404, "contact not found");
    }

    return {
      status: 200,
      contact,
    };
  },

  create: async (data, { mongoDb }) => {
    const { contactModel } = mongoDb;

    const { name, email, phone, subscription, password, token = "" } = data;

    if (!name || !email || !phone || !subscription || !password) {
      throwErr(400, "Missing required name field");
    }

    await contactModel.create({
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
      contact: { name, email, phone, subscription, password, token },
    };
  },

  update: async (data, { mongoDb }) => {
    const { contactModel } = mongoDb;
    const _id = data.params.id;

    const { name, email, phone, subscription, password, token } = data;

    if (!name || !email || !phone || !subscription || !password) {
      throwErr(400, "Missing required name field");
    }

    const contact = await contactModel.findOneAndUpdate(
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
      contact,
    };
  },

  delete: async (data, { mongoDb }) => {
    const { contactModel } = mongoDb;
    const _id = data.params.id;

    await contactModel.deleteOne({ _id });

    return {
      status: 200,
      message: "Contact deleted",
    };
  },
};

module.exports = contact;
