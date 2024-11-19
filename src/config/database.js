import { mongoose } from 'mongoose';
import { USERNAME_DB, PASSWORD_DB, CLUSTER_DB, APPNAME_DB } from '../config.js';

const uri = `mongodb+srv://${USERNAME_DB}:${PASSWORD_DB}@${CLUSTER_DB}.fn7qd.mongodb.net/?retryWrites=true&w=majority&appName=${APPNAME_DB}`;

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

export const connectDB = () => {
  mongoose.connect(uri, clientOptions)
    .then(() => {
      console.log("Connected to MongoDB");
    }).catch(err => {
      console.log(err);
    })
}