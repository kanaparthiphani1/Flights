function addRowLockOnFlights(flightTripId) {
  return `SELECT * from FlightTrips WHERE FlightTrips.id = ${flightTripId} FOR UPDATE;`;
}

module.exports = {
  addRowLockOnFlights,
};
