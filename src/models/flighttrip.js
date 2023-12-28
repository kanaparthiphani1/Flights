"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class FlightTrip extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Flight, {
        foreignKey: "flightId",
      });
      this.belongsTo(models.Airport, {
        foreignKey: "departureAirportId",
      });
      this.belongsTo(models.Airport, {
        foreignKey: "arrivalAirportId",
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
