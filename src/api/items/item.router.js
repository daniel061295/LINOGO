import { Router } from 'express';
import { ItemController } from './item.controller.js';
import { ItemSchema } from './item.schema.js';
import { protectedEndPoint } from '../../middlewares/auth.js';

export const createItemRouter = ({ itemModel }) => {
  const itemRouter = Router();

  const itemSchema = new ItemSchema();
  const itemController = new ItemController({ Model: itemModel, Schema: itemSchema });

  itemRouter.post('/', protectedEndPoint, itemController.create);
  itemRouter.get('/', protectedEndPoint, itemController.getAll);
  itemRouter.get('/:id', protectedEndPoint, itemController.getById);
  itemRouter.put('/:id', protectedEndPoint, itemController.update);
  itemRouter.delete('/:id', protectedEndPoint, itemController.delete);

  return itemRouter;
};