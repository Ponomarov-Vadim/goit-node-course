const { Router } = require("express");
const { makeCall } = require("../helpers");
const userController = require("../controllers/userController");

const userRouter = Router();

userRouter.get("/get", (req, res) => makeCall(req, res, userController.getAll));

userRouter.get("/get/:id", (req, res) =>
  makeCall(req, res, userController.get)
);

userRouter.post("/create", (req, res) =>
  makeCall(req, res, userController.create)
);

userRouter.patch("/update/:id", (req, res) =>
  makeCall(req, res, userController.update)
);

userRouter.delete("/delete/:id", (req, res) =>
  makeCall(req, res, userController.delete)
);

module.exports = userRouter;
