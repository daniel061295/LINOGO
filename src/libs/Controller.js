export class Controller {
  constructor({ Model, Schema }) {
    this.Model = Model
    this.Schema = Schema
  }
  getAll = async (req, res) => {
    const { status, result } = await this.Model.getAll();
    if (status) return res.json(result);
    return res.status(500).json({ result: `Error on get method: ${result}` });
  };

  create = async (req, res) => {
    const validationResult = this.Schema.validate(req.body);
    if (!validationResult.success) {
      return res.status(422).json({ result: JSON.parse(validationResult.error.message) });
    }
    const { status, result } = await this.Model.createNew({ input: req.body });
    if (status) return res.status(201).json(result);
    res.status(500).json({ result: `Error on create method: ${result}` });
  };

  delete = async (req, res) => {
    const { id } = req.params;

    const { status, result } = await this.Model.delete({ id });

    if (status === false) {
      return res.status(404).json({ result: `Object with id: ${id} not found` });
    }
    return res.json({ result: result });
  };

  update = async (req, res) => {
    const validationResult = this.Schema.validatePartial(req.body);
    if (!validationResult.success) {
      return res.status(400).json({ error: JSON.parse(validationResult.error.message) });
    }
    else if (Object.entries(validationResult.data) == 0) {
      return res.status(400).json({ status: false, result: 'User was not updated' });
    }

    const { id } = req.params;
    const { status, result } = await this.Model.updateByPk({ id, input: validationResult.data });

    if (status) return res.status(201).json(result);
    res.status(500).json({ result: `Error on update method: ${result}` });
  };

  getById = async (req, res) => {
    const { id } = req.params;
    const { status, result } = await this.Model.getById({ id });
    if (status) return res.json(result);
    res.status(404).json({ result: `Object with id: ${id} not found` });
  };


}