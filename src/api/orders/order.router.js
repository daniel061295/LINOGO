import { Router } from 'express';
import { OrderController } from './order.controller.js';
import { OrderSchema } from './order.schema.js';

export const createOrderRouter = ({ orderModel }) => {
  const orderRouter = Router();

  const orderSchema = new OrderSchema();
  const orderController = new OrderController({ Model: orderModel, Schema: orderSchema });

  orderRouter.post('/', orderController.create);
  orderRouter.get('/', orderController.getAll);
  orderRouter.get('/:id', orderController.getById);
  orderRouter.put('/:id', orderController.update);
  orderRouter.delete('/:id', orderController.delete);

  return orderRouter;
};