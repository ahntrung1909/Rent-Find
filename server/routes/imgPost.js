const express = require("express");
const router = express.Router();
const imgPostController = require("../controllers/ImgPostController");

router.get(`/img/:id`, imgPostController.getImage);

module.exports = router;
