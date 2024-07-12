const express = require("express");
const router = express.Router();
const AdminController = require("../controllers/AdminController");
const { authenticateJWT } = require("../middlewares/auth.middleware");

/* GET users listing. */
router.get("/", function (req, res, next) {
    res.send("respond with a resource");
});
router.get(`/get-all-users`, AdminController.getAllUsers);
router.get(`/get-all-violated-users`, AdminController.getAllViolatedUsers);
router.get(`/get-all-reports`, AdminController.getAllReports);
router.get(`/get-all-posts`, AdminController.getAllPosts);
router.get(`/get-all-pending-posts`, AdminController.getAllPendingPosts);
router.post(`/delete-post/:id`, AdminController.deletePosts);
router.post(
    "/report-success/:id",
    authenticateJWT,
    AdminController.reportSuccess
);
router.post(
    "/report-unsuccess/:id",
    authenticateJWT,
    AdminController.reportUnsuccess
);
router.get(
    "/search-posts-by-fullName/:slug",
    AdminController.searchPostsByFullName
);
router.get(
    "/search-user-by-fullName/:slug",
    AdminController.searchUserByFullName
);
router.get(
    "/search-pending-post-by-fullName/:slug",
    AdminController.searchPendingPostByFullName
);
router.get(
    "/search-accused-by-fullName/:slug",
    AdminController.searchAccusedByFullName
);

module.exports = router;
