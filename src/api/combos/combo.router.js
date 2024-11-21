import { Router } from 'express';
import { ComboController } from './combo.controller.js';
import { ComboSchema } from './combo.schema.js';
import { protectedEndPoint } from '../../middlewares/auth.js';

export const createComboRouter = ({ comboModel }) => {
  const comboRouter = Router();

  const comboSchema = new ComboSchema();
  const comboController = new ComboController({ Model: comboModel, Schema: comboSchema });

  comboRouter.post('/', protectedEndPoint, comboController.create);
  comboRouter.get('/', protectedEndPoint, comboController.getAll);
  comboRouter.get('/:id', protectedEndPoint, comboController.getById);
  comboRouter.put('/:id', protectedEndPoint, comboController.update);
  comboRouter.delete('/:id', protectedEndPoint, comboController.delete);

  return comboRouter;
};