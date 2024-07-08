const express = require("express");
const router = express.Router();
const { authenticateJWT } = require("../middlewares/auth.middleware");
const PostController = require("../controllers/PostController");

router.get("/get-posts", PostController.getPosts);
router.get("/get-rent-posts", PostController.getRentPosts);
router.get("/get-lease-posts", PostController.getLeasePosts);
router.post("/upload-post", authenticateJWT, PostController.uploadPost);
router.post("/update-post/:id", PostController.updatePost);
router.get("/get-detail-post/:id", PostController.getDetailsPost);
router.get("/get-my-posts/:id", PostController.getMyPosts);
router.get("/get-my-hidden-posts/:id", PostController.getMyHidPosts);
router.post("/search", PostController.search);

module.exports = router;
