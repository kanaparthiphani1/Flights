const { FlightService } = require("../services");
const { StatusCodes } = require("http-status-codes");
const { SuccessResponse, ErrorResponse } = require("../utils/common");

async function addFlight(req, res) {
  const { flightNumber, capacity } = req.body;
  try {
    const flight = await FlightService.addFlight(flightNumber, capacity);
    SuccessResponse.data = flight;
    res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    console.log("Erorr : ", error);
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

module.exports = { addFlight };
