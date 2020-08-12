const { throwErr } = require("./../helpers");
const mongoose = require("mongoose");

const auth = {
  register: async (data, { mongoDb }) => {
    const { email, password } = data;
    const { userModel } = mongoDb;

    if (!email || !password) return throwErr(400, "Check required fields.");

    const user = await userModel.findOne({ email });
    if (user) return throwErr(409, { message: "Email in use" });

    await userModel.create({
      _id: mongoose.Types.ObjectId(),
      email,
      password,
    });

    return {
      status: 200,
      user: {
        email,
        password,
      },
    };
  },

  logIn: async (data, { mongoDb }) => {
    const { email, password } = data;
    const { userModel } = mongoDb;

    if (!email || !password)
      return throwErr(401, "Email or password is wrong.");

    const user = await userModel.findOne({ email });
    if (!user) return throwErr(401, "Email or password is wrong.");

    const isValid = await user.comparePassword(password.toString());
    if (!isValid) return throwErr(401, "Email or password is wrong.");

    const token = await user.generateToken();
    const userWithToken = await userModel.findOneAndUpdate(
      { _id: user._id },
      { token },
      { new: true }
    );

    return {
      status: 200,
      userWithToken,
    };
  },

  logOut: async (data, { mongoDb }) => {
    const token = data.params.authorization;
    const { userModel } = mongoDb;

    const user = await userModel.findOne({ token });

    if (!user) {
      throwErr(401, { message: "Not authorized" });
    }
    await userModel.findOneAndUpdate(
      { token },
      {
        token: null,
      }
    );

    return {
      status: 204,
    };
  },
};

module.exports = auth;
