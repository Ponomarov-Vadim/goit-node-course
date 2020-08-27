const { Router } = require("express");
const { makeCall } = require("../helpers");
const { jwtMiddleware } = require("./../middleware/jwt");

const user = require("../controllers/userController");
const { route } = require("./contactRouter");

const router = Router();

router.get("/current/:authorization", jwtMiddleware, (req, res) =>
  makeCall(req, res, user.get)
);

router.patch("/avatars/:authorization", jwtMiddleware, (req, res) =>
  makeCall(req, res, user.updateAvatar)
);

router.patch("/current/:authorization", jwtMiddleware, (req, res) =>
  makeCall(req, res, user.update)
);

module.exports = router;
