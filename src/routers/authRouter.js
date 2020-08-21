const { Router } = require("express");
const { makeCall } = require("../helpers");

const auth = require("../controllers/authController");
const { jwtMiddleware } = require("./../middleware/jwt");

const router = Router();

router.post("/register", (req, res) => makeCall(req, res, auth.register));
router.post("/login", (req, res) => makeCall(req, res, auth.logIn));
router.post("/logout/:authorization", jwtMiddleware, (req, res) =>
  makeCall(req, res, auth.logOut)
);

module.exports = router;
