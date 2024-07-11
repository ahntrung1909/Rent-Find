const express = require("express");
const router = express.Router();
const adminController = require("../controllers/AdminController");
const { authenticateJWT } = require("../middlewares/auth.middleware");

/* GET users listing. */
router.get("/", function (req, res, next) {
    res.send("respond with a resource");
});
router.get(`/get-all-users`, adminController.getAllUsers);
router.get(`/get-all-violated-users`, adminController.getAllViolatedUsers);
router.get(`/get-all-reports`, adminController.getAllReports);
router.get(`/get-all-posts`, adminController.getAllPosts);
router.get(`/get-all-pending-posts`, adminController.getAllPendingPosts);
router.post(`/delete-post/:id`, adminController.deletePosts);
module.exports = router;
