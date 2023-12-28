class CRUDRepo {
  constructor(model) {
    this.model = model;
  }

  //getbyId
  async getById(data) {
    return await this.model.findByPk(data);
  }

  //getAll
  async getAll() {
    return await this.model.findAll();
  }
  //create
  async create(data) {
    return await this.model.create(data);
  }

  //deletebyid
  async destroy(id) {
    return await this.model.destroy({
      where: {
        id,
      },
    });
  }
}

module.exports = CRUDRepo;
