const express = require("express");
const router = express.Router();
const FlightRouter = require("./flight-router");

router.use("/flight", FlightRouter);

module.exports = router;
