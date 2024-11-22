import { mongoose } from 'mongoose';
import { connectDB } from '../../config/database.js';
import { Model } from '../../libs/Model.js';

const orderSchemaMongoose = new mongoose.Schema({
  order_name: { type: String, required: true },
  order_address: { type: String, required: true },
  order_phone_number: { type: Number, required: true },
  order_cedula: { type: Number, required: true },
  order_city: { type: String, required: true },
  order_status: {
    type: String,
    required: true,
    enum: ["En proceso", "Enviado", "Por reclamar", "Entregado", "Devuelto"]
  },
  order_guide_number: { type: Number, required: true, unique: true },
  order_products: [{
    _id: false,
    type: { type: String, required: true, enum: ["Item", "Combo"] },
    reference: { type: mongoose.Schema.Types.ObjectId, required: true, refPath: "order_products.type" }
  }],
  order_value: { type: Number, required: true },
});

connectDB();

export class OrderModel extends Model {
  static Instance = mongoose.model('Order', orderSchemaMongoose);
}
