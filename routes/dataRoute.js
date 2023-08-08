const express = require("express");


const {dataController, carTypeController, cityController, paymentModeController, getAllCorporateData} = require("../controller/dataController");
const { addBookerController, loginBookerController } = require("../controller/bookerController");

const router = express.Router();

router.get("/get",dataController);
router.get("/cities",cityController);
router.get("/carType",carTypeController);
router.get("/paymentModes",paymentModeController);
router.post("/allData",getAllCorporateData);
router.post("/signup",addBookerController);
router.post("/login",loginBookerController);

module.exports = router;