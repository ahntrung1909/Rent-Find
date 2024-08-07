const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");
const { authenticateJWT } = require("../middlewares/auth.middleware");

/* GET users listing. */
router.get("/", function (req, res, next) {
    res.send("respond with a resource");
});
router.get(`/user-information/:id`, userController.getInfo);
router.post(
    `/update-user-information`,
    authenticateJWT,
    userController.updateInfo
);
router.get(
    `/get-all-users/:senderId`,
    authenticateJWT,
    userController.getAllUsers
);
router.get(
    "/search-user-by-fullName/:slug",
    userController.searchUserByFullName
);
module.exports = router;
