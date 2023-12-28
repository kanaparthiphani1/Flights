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

async function getFlights(req, res) {
  try {
    const flights = await FlightService.getFlights();
    SuccessResponse.data = flights;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function getFlight(req, res) {
  try {
    const flight = await FlightService.getFlight(req.params.id);
    SuccessResponse.data = flight;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function deleteFlight(req, res) {
  try {
    const flight = await FlightService.deleteFlight(req.params.id);
    SuccessResponse.data = flight;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

module.exports = { addFlight, getFlights, getFlight, deleteFlight };
