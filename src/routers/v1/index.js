const express = require("express");
const router = express.Router();
const FlightRouter = require("./flight-router");
const CityRouter = require("./city-router");
const AirportRouter = require("./airport-router");

router.use("/flight", FlightRouter);
router.use("/city", CityRouter);
router.use("/airport", AirportRouter);

module.exports = router;
