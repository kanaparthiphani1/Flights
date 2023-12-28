const express = require("express");
const router = express.Router();
const { FlightController } = require("../../controllers");
const { FlightMiddleware } = require("../../middlewares");

router.post(
  "/",
  FlightMiddleware.checkFlightNumber,
  FlightController.addFlight
);

module.exports = router;
