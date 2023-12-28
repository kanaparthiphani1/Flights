const express = require("express");

const { FlightTripController } = require("../../controllers");
const { FlightTripMiddleware } = require("../../middlewares");

const router = express.Router();

// /api/v1/flights POST
router.post(
  "/",
  FlightTripMiddleware.validateCreateRequest,
  FlightTripController.createFlightTrip
);

module.exports = router;
