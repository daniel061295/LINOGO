import { mongoose } from 'mongoose';
import { connectDB } from '../../config/database.js';

const comboSchemaMongoose = new mongoose.Schema({
  combo_name: { type: String, required: true },
  combo_description: { type: String, required: true },
  combo_items: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item" }],
  combo_value: { type: Number, required: true },
}
);
const Combo = mongoose.model('Combo', comboSchemaMongoose);

connectDB();

export class ComboModel {
  constructor() { }
  static async createNew({ input }) {
    const { combo_name, combo_description, combo_items, combo_value } = input;
    let status = false;
    let result = "";
    const newCombo = new Combo({ combo_name, combo_description, combo_items, combo_value })

    await newCombo.save()
      .then(() => {
        status = true;
        result = newCombo
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
    await Combo.find({}).populate('combo_items').exec()
      .then(combos => {
        status = true;
        result = combos
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
    await Combo.find({ _id: id }).populate('combo_items').exec()
      .then(combos => {
        status = true;
        result = combos
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
    await Combo.updateOne({ _id: id }, { ...input })
      .then(() => {
        status = true;
        result = 'Combo updated successfully'
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
    await Combo.deleteOne({ _id: id })
      .then(() => {
        status = true;
        result = 'Combo deleted successfully'
      })
      .catch(err => {
        status = false;
        result = 'Error on delete: ' + err
      });
    return { status, result };
  }

}
