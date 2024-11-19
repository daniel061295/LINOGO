import { Router } from 'express';
import { UserController } from './user.controller.js';
import { UserSchema } from './user.schema.js';

export const createUserRouter = ({ userModel }) => {
  const userRouter = Router();

  const userSchema = new UserSchema();
  const userController = new UserController({ Model: userModel, Schema: userSchema });

  // userRouter.post('/login', userController.login);
  // userRouter.post('/logout', userController.logout);

  // userRouter.get('/:id', protectedEndPoint, userController.getById);
  // userRouter.delete('/:id', protectedEndPoint, userController.delete);
  userRouter.post('/register', userController.create);
  userRouter.get('/', userController.getAll);
  userRouter.get('/:id', userController.getById);
  userRouter.put('/:id', userController.update);
  userRouter.delete('/:id', userController.delete);

  return userRouter;
};