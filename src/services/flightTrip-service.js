const { StatusCodes } = require("http-status-codes");
const { FlightTripRepo } = require("../repositories");
const AppError = require("../utils/errors/app-error");

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
    [departureAirportId, arrivalAirportId] = query.trips.split("-");
    customFilter.departureAirportId = departureAirportId;
    customFilter.arrivalAirportId = arrivalAirportId;
  }
  if (query.price) {
    [minPrice, maxPrice] = query.price.split("-");
    customFilter.price = {
      [Op.between]: [minPrice, maxPrice == undefined ? 20000 : maxPrice],
    };
  }

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

module.exports = { createFlightTrip };
