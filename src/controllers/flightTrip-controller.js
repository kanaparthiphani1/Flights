const { StatusCodes } = require("http-status-codes");

const { FlightTripService } = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/common");

async function createFlightTrip(req, res) {
  try {
    const flight = await FlightTripService.createFlightTrip({
      flightCode: req.body.flightCode,
      flightId: req.body.flightId,
      departureAirportId: req.body.departureAirportId,
      arivalAirportId: req.body.arivalAirportId,
      arrivalTime: req.body.arrivalTime,
      departureTime: req.body.departureTime,
      price: req.body.price,
      boardingGate: req.body.boardingGate,
      totalSeats: req.body.totalSeats,
    });
    SuccessResponse.data = flight;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function getAllFlightTrips(req, res) {
  try {
    const flights = await FlightTripService.getAllFlightTrips(req.query);
    SuccessResponse.data = flights;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function getFlightTrip(req, res) {
  try {
    const flightTrip = await FlightTripService.getFlightTrip(req.params.id);
    SuccessResponse.data = flightTrip;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function updateSeats(req, res) {
  try {
    console.log(req.body);
    const response = await FlightTripService.updateSeats({
      flightTripId: req.params.id,
      seats: req.body.seats,
      dec: req.body.dec,
    });
    SuccessResponse.data = response;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

module.exports = {
  createFlightTrip,
  getAllFlightTrips,
  getFlightTrip,
  updateSeats,
};
