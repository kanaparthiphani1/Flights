const { StatusCodes } = require("http-status-codes");

const { CityRepo } = require("../repositories");
const AppError = require("../utils/errors/app-error");

const cityRepository = new CityRepo();

async function createCity(data) {
  try {
    const city = await cityRepository.create(data);
    return city;
  } catch (error) {
    if (
      error.name == "SequelizeValidationError" ||
      error.name == "SequelizeUniqueConstraintError"
    ) {
      let desc = [];
      error.errors.forEach((err) => {
        desc.push(err.message);
      });
      throw new AppError(desc, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      "Cannot create a new city",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  createCity,
};
