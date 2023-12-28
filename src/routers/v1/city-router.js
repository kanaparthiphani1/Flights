const express = require("express");
const router = express.Router();
const { CityController } = require("../../controllers");
const { CityMiddleware } = require("../../middlewares");

router.post(
  "/",
  CityMiddleware.validateCreateRequest,
  CityController.createCity
);

module.exports = router;
