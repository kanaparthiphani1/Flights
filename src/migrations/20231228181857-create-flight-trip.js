"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("FlightTrips", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      flightCode: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      flightId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Flights",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      departureAirportId: {
        type: Sequelize.STRING,
        references: {
          model: "Airports",
          key: "code",
        },
        onDelete: "CASCADE",
        allowNull: false,
      },
      arivalAirportId: {
        type: Sequelize.STRING,
        references: {
          model: "Airports",
          key: "code",
        },
        onDelete: "CASCADE",
        allowNull: false,
      },
      arrivalTime: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      departureTime: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      boardingGate: {
        type: Sequelize.STRING,
      },
      totalSeats: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("FlightTrips");
  },
};
