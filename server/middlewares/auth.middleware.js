const passport = require("passport");

const authenticateJWT = (req, res, next) => {
    passport.authenticate("jwt", { session: false }, (err, user, info) => {
        if (err) {
            console.log("lỗi", err);
            return res.status(500).json({
                success: false,
                message: "Lỗi xảy ra khi authorization",
                error: err.message,
            });
        }
        if (!user) {
            return res
                .status(401)
                .json({ success: false, message: "Unauthorized" });
        }
        req.user = user;
        next();
    })(req, res, next);
};

module.exports = { authenticateJWT };
