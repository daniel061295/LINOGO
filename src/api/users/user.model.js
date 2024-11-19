import { mongoose } from 'mongoose';
import { connectDB } from '../../config/database.js';

const userSchemaMongoose = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
}
);
const User = mongoose.model('User', userSchemaMongoose);

connectDB();

export class UserModel {
  constructor() { }
  static async createNew({ input }) {
    const { username, password } = input;
    let status = false;
    let result = "";
    const newUser = new User({ username, password })
    // await newUser.validate();
    await newUser.save()
      .then(() => {
        status = true;
        result = newUser
      })
      .catch(err => {
        // console.log('Error:' + err.message)
        status = false;
        result = err.message;
      });
    return { status, result };
  }
  static async getAll() {
    let status = false;
    let result = "";
    await User.find({})
      .then(usuarios => {
        status = true;
        result = usuarios
      })
      .catch(err => {
        status = false;
        result = err.message
        // console.error('Error al buscar:', err)
      });
    return { status, result };
  }
  static async getById({ id }) {
    let status = false;
    let result = "";
    await User.find({ _id: id })
      .then(usuarios => {
        status = true;
        result = usuarios
      })
      .catch(err => {
        status = false;
        result = err.message
        // console.error('Error al buscar:', err)
      });
    return { status, result };
  }

  static async updateByPk({ id, input }) {
    let status = false;
    let result = "";
    await User.updateOne({ _id: id }, { ...input })
      .then(() => {
        status = true;
        result = 'User updated successfully'
        // console.log(result)
      })
      .catch(err => {
        status = false;
        result = err.message
        // console.error('Error al actualizar:', err)
      });
    return { status, result };
  }

  static async delete({ id }) {
    let status = false;
    let result = "";
    await User.deleteOne({ _id: id })
      .then(() => {
        status = true;
        result = 'User deleted successfully'
      })
      .catch(err => {
        status = false;
        result = 'Error on delete: ' + err
        // console.error(result);
      });
    return { status, result };
  }

}
