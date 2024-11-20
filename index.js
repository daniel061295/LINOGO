import express, { json } from 'express';
import { corsMiddleware } from './src/middlewares/cors.js';
import { createUserRouter, UserModel } from './src/api/users/user.index.js';
import { createItemRouter, ItemModel } from './src/api/items/item.index.js';

const app = express();
app.disable('x-powered-by');

app.use(corsMiddleware());
app.use(json());

app.use('/users', createUserRouter({ userModel: UserModel }));
app.use('/items', createItemRouter({ itemModel: ItemModel }));

const PORT = process.env.PORT ?? 5000;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
})