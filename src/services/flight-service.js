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

module.exports = { addFlight };
