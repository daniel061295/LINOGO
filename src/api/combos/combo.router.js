import { Router } from 'express';
import { ComboController } from './combo.controller.js';
import { ComboSchema } from './combo.schema.js';

export const createComboRouter = ({ comboModel }) => {
  const comboRouter = Router();

  const comboSchema = new ComboSchema();
  const comboController = new ComboController({ Model: comboModel, Schema: comboSchema });

  comboRouter.post('/', comboController.create);
  comboRouter.get('/', comboController.getAll);
  comboRouter.get('/:id', comboController.getById);
  comboRouter.put('/:id', comboController.update);
  comboRouter.delete('/:id', comboController.delete);

  return comboRouter;
};