import { mongoose } from 'mongoose';
import { connectDB } from '../../config/database.js';

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
}
);
const Order = mongoose.model('Order', orderSchemaMongoose);

connectDB();

export class OrderModel {
  constructor() { }
  static async createNew({ input }) {
    const { order_name, order_address, order_phone_number, order_cedula, order_city, order_status, order_guide_number, order_products, order_value } = input;
    let status = false;
    let result = "";
    const newOrder = new Order({ order_name, order_address, order_phone_number, order_cedula, order_city, order_status, order_guide_number, order_products, order_value })

    await newOrder.save()
      .then(() => {
        status = true;
        result = newOrder
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
    await Order.find({})
      .then(orders => {
        status = true;
        result = orders
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
    await Order.find({ _id: id })
      .then(orders => {
        status = true;
        result = orders
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
    await Order.updateOne({ _id: id }, { ...input })
      .then(() => {
        status = true;
        result = 'Order updated successfully'
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
    await Order.deleteOne({ _id: id })
      .then(() => {
        status = true;
        result = 'Order deleted successfully'
      })
      .catch(err => {
        status = false;
        result = 'Error on delete: ' + err
      });
    return { status, result };
  }

}
