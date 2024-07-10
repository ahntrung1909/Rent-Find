const express = require("express");
const router = express.Router();
const passport = require("passport");
require("dotenv").config();
const ggAuthController = require("../controllers/ggAuthController");

//localhost:3000/api/auth/google
router.get(
    "/google",
    passport.authenticate("google", {
        scope: ["profile", "email"],
        session: false,
    })
);
router.get(
    "/google/callback",
    passport.authenticate("google", {
        successRedirect: "http://localhost:5173",
        failureRedirect: "/login/failed",
    })
);

router.get("/login/success", (req, res) => {
    if (req.user) {
        res.status(200).json({
            success: true,
            message: "successful",
            user: req.user,
            //cookies: req.cookies
        });
    }
});
router.get("/login/failed", (req, res) => {
    res.status(401).json({
        success: false,
        message: "failure",
    });
});
router.get("/logout", (req, res) => {
    req.logout();
    res.redirect(process.env.URL_CLIENT);
});

module.exports = router;
