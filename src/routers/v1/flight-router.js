const express = require("express");
const router = express.Router();
const { FlightController } = require("../../controllers");
const { FlightMiddleware } = require("../../middlewares");

router.post(
  "/",
  FlightMiddleware.checkFlightNumber,
  FlightController.addFlight
);
router.get("/", FlightController.getFlights);
router.get("/:id", FlightController.getFlight);
router.delete("/:id", FlightController.deleteFlight);

module.exports = router;
