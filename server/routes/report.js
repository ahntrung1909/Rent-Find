const express = require("express");
const router = express.Router();
const { authenticateJWT } = require("../middlewares/auth.middleware");
const ReportController = require("../controllers/ReportController");

router.post("/upload-report", ReportController.uploadReport);

module.exports = router;
