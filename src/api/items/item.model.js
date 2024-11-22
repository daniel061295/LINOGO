import { mongoose } from 'mongoose';
import { connectDB } from '../../config/database.js';
import { Model } from '../../libs/Model.js';

const itemSchemaMongoose = new mongoose.Schema({
  item_name: { type: String, required: true, unique: true },
  url_image: { type: String, required: false },
  unit_value: { type: Number, required: true },
});

connectDB();

export class ItemModel extends Model {
  static Instance = mongoose.model('Item', itemSchemaMongoose);

}
