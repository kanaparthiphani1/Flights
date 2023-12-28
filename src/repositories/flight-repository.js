const CRUDRepo = require("./crud-repository");
const { Flight } = require("../models");

class FlightRepo extends CRUDRepo {
  constructor() {
    super(Flight);
  }
}

module.exports = FlightRepo;
