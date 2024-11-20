import { mongoose } from 'mongoose';
import { connectDB } from '../../config/database.js';

const itemSchemaMongoose = new mongoose.Schema({
  item_name: { type: String, required: true },
  url_image: { type: String, required: false },
  unit_value: { type: Number, required: true },
}
);
const Item = mongoose.model('Item', itemSchemaMongoose);

connectDB();

export class ItemModel {
  constructor() { }
  static async createNew({ input }) {
    const { item_name, url_image, unit_value } = input;
    let status = false;
    let result = "";
    const newItem = new Item({ item_name, url_image, unit_value })

    await newItem.save()
      .then(() => {
        status = true;
        result = newItem
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
    await Item.find({})
      .then(items => {
        status = true;
        result = items
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
    await Item.find({ _id: id })
      .then(items => {
        status = true;
        result = items
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
    await Item.updateOne({ _id: id }, { ...input })
      .then(() => {
        status = true;
        result = 'Item updated successfully'
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
    await Item.deleteOne({ _id: id })
      .then(() => {
        status = true;
        result = 'Item deleted successfully'
      })
      .catch(err => {
        status = false;
        result = 'Error on delete: ' + err
      });
    return { status, result };
  }

}
