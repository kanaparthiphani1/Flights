const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-error");
const { Logger } = require("../config");

function checkFlightNumber(req, res, next) {
  console.log("Req : ", req.body);
  if (!req.body.flightNumber) {
    ErrorResponse.message = "Something went wrong while creating airplane";
    Logger.error(ErrorResponse.message);
    ErrorResponse.error = new AppError(
      ["Model Number not found in the oncoming request in the correct form"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  next();
}

module.exports = { checkFlightNumber };
