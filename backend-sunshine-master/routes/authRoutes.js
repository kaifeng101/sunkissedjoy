const express = require("express");
const cors = require('cors');
const router = express.Router();
const controller = require("../controller/auth");
const passport = require("passport");
router.route("/login").post(controller.login);
router.route("/signup").post(controller.signup);
router.route('/verify-reset-token').post(controller.verifyResetPasswordToken);
router.route('/reset-password').post(controller.resetPassword);
router.route('/forgot-password').post(controller.forgotPassword);

router.get("/login/success", controller.handleGoogleLoginSuccess);

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    error: true,
    message: "Log in failure",
  });
});

router.get("/google", passport.authenticate("google", ["profile", "email"]));

router.use(cors());
router.get(
  "/google/redirect",
  passport.authenticate("google", {
    successRedirect: "http://localhost:5173/google-redirect",
    failureRedirect: "/login/failed",
  })
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("http://localhost:3000");
});

module.exports = router;
