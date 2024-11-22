export class Model {
  constructor() {
  }
  static Instance;
  static async createNew({ input }) {
    let status = false;
    let result = "";
    const newInstance = new this.Instance({ ...input })

    await newInstance.save()
      .then(() => {
        status = true;
        result = newInstance
      })
      .catch(err => {
        status = false;
        result = err.message;
      });
    return { status, result };
  }

  static async getAll() {
    let status = false;
    let result = "";
    await this.Instance.find({})
      .then(instances => {
        status = true;
        result = instances
      })
      .catch(err => {
        status = false;
        result = err.message
      });
    return { status, result };
  }

  static async getById({ id }) {
    let status = false;
    let result = "";
    await this.Instance.find({ _id: id })
      .then(instances => {
        if (instances.length > 0) {
          status = true;
          result = instances[0]
        } else {
          status = false;
          result = 'no objects found!'
        }
      })
      .catch(err => {
        status = false;
        result = err.message

      });
    return { status, result };
  }

  static async updateByPk({ id, input }) {
    let status = false;
    let result = "";
    await this.Instance.updateOne({ _id: id }, { ...input })
      .then(() => {
        status = true;
        result = 'Object updated successfully'
      })
      .catch(err => {
        status = false;
        result = err.message
      });
    return { status, result };
  }

  static async delete({ id }) {
    let status = false;
    let result = "";
    await this.Instance.deleteOne({ _id: id })
      .then(() => {
        status = true;
        result = 'Object deleted successfully'
      })
      .catch(err => {
        status = false;
        result = 'Error on delete: ' + err
      });
    return { status, result };
  }
}