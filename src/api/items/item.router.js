import { Router } from 'express';
import { ItemController } from './item.controller.js';
import { ItemSchema } from './item.schema.js';

export const createItemRouter = ({ itemModel }) => {
  const itemRouter = Router();

  const itemSchema = new ItemSchema();
  const itemController = new ItemController({ Model: itemModel, Schema: itemSchema });

  itemRouter.post('/', itemController.create);
  itemRouter.get('/', itemController.getAll);
  itemRouter.get('/:id', itemController.getById);
  itemRouter.put('/:id', itemController.update);
  itemRouter.delete('/:id', itemController.delete);

  return itemRouter;
};