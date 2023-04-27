const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const { User } = require("../models");

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are both required." });
  }
  try {
    const hashedPassword = bcrypt.hashSync(password, 10);
    await User.create({ username, password: hashedPassword });
    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.status(500).json({
        message: "An error occurred during authentication",
        error: err,
      });
    }

    if (!user) {
      return res.status(401).json({ message: "There was an error with the user" });
    }

    req.login(user, (err) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "An error occurred during login", error: err });
      }

      return res.status(200).json({ message: "Login successful" });
    });
  })(req, res, next);
});

router.post("/logout", (req, res) => {
  req.logout((error) => {
    if (error) return next(error);
  });
  res.status(200).json({ message: "Logout successful" });
});

module.exports = router;
