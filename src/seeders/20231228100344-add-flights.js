"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("Flights", [
      {
        flightNumber: "airbus340",
        capacity: 900,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        flightNumber: "boeing777",
        capacity: 450,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Flights", {
      [Op.or]: [{ flightNumber: "boeing777" }, { modelNumber: "airbus340" }],
    });
  },
};
