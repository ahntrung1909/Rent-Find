const express = require("express");
const router = express.Router();
const { authenticateJWT } = require("../middlewares/auth.middleware");
const MessageController = require("../controllers/MessageController");

router.post("/upload-msg", MessageController.uploadMessage);
module.exports = router;
