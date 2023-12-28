const CRUDRepo = require("./crud-repository");
const { City } = require("../models");

class CityRepo extends CRUDRepo {
  constructor() {
    super(City);
  }
}

module.exports = CityRepo;
