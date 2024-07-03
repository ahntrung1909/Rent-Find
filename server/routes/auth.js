const express = require("express");
const authController = require("../controllers/authController");
const { authenticateJWT } = require("../middlewares/auth.middleware");
const router = express.Router();

router.post("/sign-up", authController.signUp);
router.post("/login", authController.login);
router.post("/refresh-token", authController.refreshToken);
router.post("/logout", authController.logout);
router.post(
    "/change-currentUser-password",
    authenticateJWT,
    authController.changePassword
);
router.post("/reset-password/get-code", authController.getResetCode);
router.post("/reset-password/check-code", authController.checkCodeReset);
router.post("/reset-password/change-password", authController.resetPassword);

module.exports = router;
