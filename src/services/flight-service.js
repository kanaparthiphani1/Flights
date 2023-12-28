const { StatusCodes } = require("http-status-codes");
const { FlightRepo } = require("../repositories");
const AppError = require("../utils/errors/app-error");

const flightRepo = new FlightRepo();

async function addFlight(flightNumber, capacity) {
  try {
    console.log("Flight Repo : ", flightRepo);
    const flight = await flightRepo.create({ flightNumber, capacity });
    return flight;
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
      "Cannot create a new Airplance object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getFlights() {
  try {
    const flights = await flightRepo.getAll();
    return flights;
  } catch (error) {
    throw new AppError(
      "Cannot fetch data of all the Flights",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getFlight(id) {
  try {
    const flight = await flightRepo.getById(id);
    return flight;
  } catch (error) {
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError(
        "Flight you requested is not available",
        StatusCodes.NOT_FOUND
      );
    }
    throw new AppError(
      "Cannot fetch data of all the Flights",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function deleteFlight(id) {
  try {
    const response = await flightRepo.destroy(id);
    return response;
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError(
        "The Flight requested to delete is not present",
        error.statusCode
      );
    }
    throw new AppError(
      "Cannot fetch data of all the airplanes",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = { addFlight, getFlights, getFlight, deleteFlight };
