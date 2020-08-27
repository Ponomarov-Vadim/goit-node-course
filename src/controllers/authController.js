const { throwErr } = require("./../helpers");
const mongoose = require("mongoose");
const { sendEmail } = require("./../services/sendgrid");
const { v4 } = require("uuid");

const auth = {
  register: async (data, { mongoDb }) => {
    const { email, password } = data;
    const { userModel } = mongoDb;
    const { HOST } = process.env;

    if (!email || !password) return throwErr(400, "Check required fields.");

    const user = await userModel.findOne({ email });
    if (user) return throwErr(409, { message: "Email in use" });

    const verificationToken = v4();
    const verifyURL = `${HOST}/auth/verify/${verificationToken}`;

    const newUser = {
      _id: mongoose.Types.ObjectId(),
      email,
      password,
      verificationToken,
    };
    await sendEmail(newUser.email, verifyURL, "registration");
    await userModel.create(newUser);

    return {
      status: 200,
      user: {
        email: newUser.email,
        password: newUser.password,
      },
    };
  },

  verify: async (data, { mongoDb }) => {
    const { userModel } = mongoDb;
    const { verificationToken } = data.params;
    const user = await userModel.findOne({ verificationToken });

    if (!user) {
      throwErr(404, "User not found");
    }

    await userModel.findOneAndUpdate(
      { verificationToken },
      {
        verificationToken: null,
      }
    );

    return {
      status: 200,
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
