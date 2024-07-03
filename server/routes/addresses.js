const express = require("express");
const router = express.Router();
const addressesController = require("../controllers/AddressesController");
const { authenticateJWT } = require("../middlewares/auth.middleware");

router.get(
    `/address-information/:id`,
    authenticateJWT,
    addressesController.getInfo
);

module.exports = router;
