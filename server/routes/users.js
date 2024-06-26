const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");
const { authenticateJWT } = require("../middlewares/auth.middleware");

/* GET users listing. */
router.get("/", function (req, res, next) {
    res.send("respond with a resource");
});
router.get(`/user-information/:id`, authenticateJWT, userController.getInfo);

module.exports = router;
