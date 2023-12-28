const CRUDRepo = require("./crud-repository");
const { FlightTrip } = require("../models");

class FlightTripRepo extends CRUDRepo {
  constructor() {
    super(FlightTrip);
  }

  async getAllFlightTrips(filter, sort) {
    const response = await Flight.findAll({
      where: filter,
      order: sort,
    });
    return response;
  }
}

module.exports = FlightTripRepo;
