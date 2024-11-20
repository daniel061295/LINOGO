import express, { json } from 'express';
import { corsMiddleware } from './src/middlewares/cors.js';
import { createUserRouter, UserModel } from './src/api/users/user.index.js';
import { createItemRouter, ItemModel } from './src/api/items/item.index.js';
import { createComboRouter, ComboModel } from './src/api/combos/combo.index.js';
import { createOrderRouter, OrderModel } from './src/api/orders/order.index.js';

const app = express();
app.disable('x-powered-by');

app.use(corsMiddleware());
app.use(json());

app.use('/users', createUserRouter({ userModel: UserModel }));
app.use('/items', createItemRouter({ itemModel: ItemModel }));
app.use('/combos', createComboRouter({ comboModel: ComboModel }));
app.use('/orders', createOrderRouter({ orderModel: OrderModel }));

const PORT = process.env.PORT ?? 5000;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
})