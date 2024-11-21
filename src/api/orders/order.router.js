import { Router } from 'express';
import { OrderController } from './order.controller.js';
import { OrderSchema } from './order.schema.js';
import { protectedEndPoint } from '../../middlewares/auth.js';

export const createOrderRouter = ({ orderModel }) => {
  const orderRouter = Router();

  const orderSchema = new OrderSchema();
  const orderController = new OrderController({ Model: orderModel, Schema: orderSchema });

  orderRouter.post('/', protectedEndPoint, orderController.create);
  orderRouter.get('/', protectedEndPoint, orderController.getAll);
  orderRouter.get('/:id', protectedEndPoint, orderController.getById);
  orderRouter.put('/:id', protectedEndPoint, orderController.update);
  orderRouter.delete('/:id', protectedEndPoint, orderController.delete);

  return orderRouter;
};