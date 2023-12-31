const CRUDRepo = require("./crud-repository");
const { FlightTrip, Flight, Airport, City } = require("../models");
const { Sequelize } = require("sequelize");
const db = require("../models");
const { addRowLockOnFlights } = require("./queries");

class FlightTripRepo extends CRUDRepo {
  constructor() {
    super(FlightTrip);
  }

  async getAllFlightTrips(filter, sort) {
    const response = await FlightTrip.findAll({
      where: filter,
      order: sort,
      include: [
        {
          model: Flight,
          required: true,
          as: "flightDetail",
        },
        {
          model: Airport,
          required: true,
          as: "departureAirport",
          on: {
            col1: Sequelize.where(
              Sequelize.col("FlightTrip.departureAirportId"),
              "=",
              Sequelize.col("departureAirport.code")
            ),
          },
          include: {
            model: City,
            required: true,
          },
        },
        {
          model: Airport,
          required: true,
          as: "arrivalAirport",
          on: {
            col1: Sequelize.where(
              Sequelize.col("FlightTrip.arivalAirportId"),
              "=",
              Sequelize.col("arrivalAirport.code")
            ),
          },
          include: {
            model: City,
            required: true,
          },
        },
      ],
    });
    return response;
  }

  async updateRemainingSeats(flightTripId, seats, dec = true) {
    // await db.sequelize.query(addRowLockOnFlights(flightTripId));
    // const flightTrip = await FlightTrip.findByPk(flightTripId);
    // if (+dec) {
    //   await flightTrip.decrement("totalSeats", { by: seats });
    // } else {
    //   await flightTrip.increment("totalSeats", { by: seats });
    // }
    // return flightTrip;

    const transaction = await db.sequelize.transaction();
    try {
      await db.sequelize.query(addRowLockOnFlights(flightTripId));
      const flightTrip = await FlightTrip.findByPk(flightTripId);
      if (+dec) {
        await flightTrip.decrement(
          "totalSeats",
          { by: seats },
          { transaction: transaction }
        );
      } else {
        await flightTrip.increment(
          "totalSeats",
          { by: seats },
          { transaction: transaction }
        );
      }
      await transaction.commit();
      return flightTrip;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}

module.exports = FlightTripRepo;
