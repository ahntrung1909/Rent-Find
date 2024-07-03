const express = require("express");
const router = express.Router();
const { authenticateJWT } = require("../middlewares/auth.middleware");
const PostController = require("../controllers/PostController");

router.get("/get-posts", PostController.getPosts);
router.post("/upload-post", authenticateJWT, PostController.uploadPost);
router.get("/get-detail-post/:id", PostController.getDetailsPost);

module.exports = router;

// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const { authenticateJWT } = require("../middlewares/auth.middleware");
// const PostController = require("../controllers/PostController");
// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// router.get("/get-posts", PostController.getPosts);
// router.post(
//     "/upload-post",
//     authenticateJWT,
//     upload.single("image"),
//     (req, res) => {
//         if (!req.file) {
//             return res.status(400).send("No file uploaded.");
//         }
//         // Here you can handle the uploaded file
//         // For example, save it to a cloud storage or file system
//         res.send({ message: "File uploaded successfully" });
//     },
//     PostController.uploadPost
// );
// router.get("/:id", PostController.getDetailsPost);

// module.exports = router;
