const { Router } = require("express");
const { makeCall } = require("../helpers");
const { jwtMiddleware } = require("./../middleware/jwt");

const user = require("../controllers/userController");

const router = Router();

router.get("/current/:authorization", jwtMiddleware, (req, res) =>
  makeCall(req, res, user.get)
);

module.exports = router;
