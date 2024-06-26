const express = require("express");
const router = express.Router();
const { authenticateJWT } = require("../middlewares/auth.middleware");
const PostController = require("../controllers/postController");

router.get("/get-posts", authenticateJWT, PostController.getPosts);
router.post("/upload-post", authenticateJWT, PostController.uploadPost);

module.exports = router;
