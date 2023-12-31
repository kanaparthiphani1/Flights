"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class FlightTrip extends Model {
    static associate(models) {
      this.belongsTo(models.Flight, {
        foreignKey: "flightId",
        as: "flightDetail",
      });
      this.belongsTo(models.Airport, {
        foreignKey: "departureAirportId",
        as: "departureAirport",
      });
      this.belongsTo(models.Airport, {
        foreignKey: "arivalAirportId",
        as: "arrivalAirport",
      });
    }
  }
  FlightTrip.init(
    {
      flightCode: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      flightId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      departureAirportId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      arivalAirportId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      arrivalTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      departureTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      boardingGate: {
        type: DataTypes.STRING,
      },
      totalSeats: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "FlightTrip",
    }
  );
  return FlightTrip;
};
