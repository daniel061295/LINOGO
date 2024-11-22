import { mongoose } from 'mongoose';
import { connectDB } from '../../config/database.js';
import { Model } from '../../libs/Model.js';

const userSchemaMongoose = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true }
});

connectDB();

export class UserModel extends Model {
  constructor() { }
  static Instance = mongoose.model('User', userSchemaMongoose);

  static async getByNameUser({ username }) {
    let status = false;
    let result = "";
    await this.Instance.find({ username })
      .then(usuarios => {
        if (usuarios.length > 0) {
          status = true;
          result = usuarios[0]
        } else {
          status = false;
          result = 'no users found!'
        }
      })
      .catch(err => {
        status = false;
        result = err.message
      });
    return { status, result };
  }

  static async getByEmail({ email }) {
    let status = false;
    let result = "";
    await this.Instance.find({ email })
      .then(usuarios => {
        if (usuarios.length > 0) {
          status = true;
          result = usuarios[0]
        } else {
          status = false;
          result = 'no users found!'
        }
      })
      .catch(err => {
        status = false;
        result = err.message
      });
    return { status, result };

  }

}
