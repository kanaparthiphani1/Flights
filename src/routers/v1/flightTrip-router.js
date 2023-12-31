const express = require("express");

const { FlightTripController } = require("../../controllers");
const { FlightTripMiddleware } = require("../../middlewares");

const router = express.Router();

router.post(
  "/",
  FlightTripMiddleware.validateCreateRequest,
  FlightTripController.createFlightTrip
);

router.get("/", FlightTripController.getAllFlightTrips);
router.get("/:id", FlightTripController.getFlightTrip);
router.patch(
  "/:id/seats",
  FlightTripMiddleware.validateUpdateSeatsRequest,
  FlightTripController.updateSeats
);

module.exports = router;
