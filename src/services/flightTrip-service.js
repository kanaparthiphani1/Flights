const { StatusCodes } = require("http-status-codes");
const { FlightTripRepo } = require("../repositories");
const AppError = require("../utils/errors/app-error");
const { Op } = require("sequelize");

const flightTripRepo = new FlightTripRepo();

async function createFlightTrip(data) {
  try {
    console.log("DATA : ", data);
    const flightTrip = await flightTripRepo.create(data);
    return flightTrip;
  } catch (error) {
    console.log("ERROR : ", error);
    if (error.name === "SequelizeValidationError") {
      let explanation = [];
      error.errors.forEach((err) => {
        explanation.push(err.message);
      });
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      "Cannot create a new Flight Trip object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAllFlightTrips(query) {
  let customFilter = {};
  let sortFilter = [];
  const endingTripTime = " 23:59:00";
  if (query.trips) {
    [departureAirportId, arivalAirportId] = query.trips.split("-");
    customFilter.departureAirportId = departureAirportId;
    customFilter.arivalAirportId = arivalAirportId;
  }
  if (query.price) {
    [minPrice, maxPrice] = query.price.split("-");
    customFilter.price = {
      [Op.between]: [minPrice, maxPrice == undefined ? 20000 : maxPrice],
    };
  }
  console.log("outside price");
  if (query.travellers) {
    customFilter.totalSeats = {
      [Op.gte]: query.travellers,
    };
  }

  if (query.tripDate) {
    customFilter.departureTime = {
      [Op.between]: [query.tripDate, query.tripDate + endingTripTime],
    };
  }

  if (query.sort) {
    const params = query.sort.split(",");
    const sortFilters = params.map((param) => param.split("_"));
    sortFilter = sortFilters;
  }

  try {
    const flights = await flightTripRepo.getAllFlightTrips(
      customFilter,
      sortFilter
    );
    return flights;
  } catch (error) {
    throw new AppError(
      "Cannot fetch data of all the flights",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getFlightTrip(id) {
  try {
    const flightTrip = await flightTripRepo.getById(id);
    return flightTrip;
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError(
        "The flightTrip you requested is not present",
        error.statusCode
      );
    }
    throw new AppError(
      "Cannot fetch data of all the flightTrip",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function updateSeats(data) {
  try {
    const res = await flightTripRepo.updateRemainingSeats(
      data.flightTripId,
      data.seats,
      data.dec
    );
    return res;
  } catch (error) {
    throw new AppError(
      "Cannot Update data of the flightTrip",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  createFlightTrip,
  getAllFlightTrips,
  getFlightTrip,
  updateSeats,
};
