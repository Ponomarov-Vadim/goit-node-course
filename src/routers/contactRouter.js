const { Router } = require("express");
const { makeCall } = require("../helpers");
const contactController = require("../controllers/contactController");

const contactRouter = Router();

contactRouter.get("/get", (req, res) =>
  makeCall(req, res, contactController.getAll)
);

contactRouter.get("/get/:id", (req, res) =>
  makeCall(req, res, contactController.get)
);

contactRouter.post("/create", (req, res) =>
  makeCall(req, res, contactController.create)
);

contactRouter.patch("/update/:id", (req, res) =>
  makeCall(req, res, contactController.update)
);

contactRouter.delete("/delete/:id", (req, res) =>
  makeCall(req, res, contactController.delete)
);

module.exports = contactRouter;
