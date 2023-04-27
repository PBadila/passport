const passport = require("passport");

function authenticate(req, res, next) {
  passport.authenticate("local", (error, user) => {
    if (error) {
      return next(error);
    }

    if (!user) {
      return res
        .status(401)
        .json({ message: "Incorrect username or password." });
    }

    req.logIn(user, (error) => {
      if (error) {
        return next(error);
      }
      next();
    });
  })(req, res, next);
}

module.exports = { authenticate };