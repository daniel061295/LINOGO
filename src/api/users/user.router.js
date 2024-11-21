import { Router } from 'express';
import { UserController } from './user.controller.js';
import { UserSchema } from './user.schema.js';
import { protectedEndPoint } from '../../middlewares/auth.js';

export const createUserRouter = ({ userModel }) => {
  const userRouter = Router();

  const userSchema = new UserSchema();
  const userController = new UserController({ Model: userModel, Schema: userSchema });

  userRouter.post('/', protectedEndPoint, userController.create);
  userRouter.get('/', protectedEndPoint, userController.getAll);
  userRouter.get('/:id', protectedEndPoint, userController.getById);
  userRouter.put('/:id', protectedEndPoint, userController.update);
  userRouter.delete('/:id', protectedEndPoint, userController.delete);

  userRouter.post('/register', userController.create);
  userRouter.post('/login', userController.login);
  userRouter.post('/logout', userController.logout);

  return userRouter;
};