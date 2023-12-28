const express = require("express");
const router = express.Router();
const FlightRouter = require("./flight-router");
const CityRouter = require("./city-router");
const AirportRouter = require("./airport-router");
const FlightTripRouter = require("./flightTrip-router");

router.use("/flight", FlightRouter);
router.use("/city", CityRouter);
router.use("/airport", AirportRouter);
router.use("/flight-trip", FlightTripRouter);

module.exports = router;
