import { mongoose } from 'mongoose';
import { connectDB } from '../../config/database.js';
import { Model } from '../../libs/Model.js';

const comboSchemaMongoose = new mongoose.Schema({
  combo_name: { type: String, required: true, unique: true },
  combo_description: { type: String, required: true },
  combo_items: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item" }],
  combo_value: { type: Number, required: true },
});

connectDB();

export class ComboModel extends Model {
  static Instance = mongoose.model('Combo', comboSchemaMongoose);
}
