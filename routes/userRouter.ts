import { Router } from 'express';
import UserController from '../controllers/userController';
import newUserValidation from '../middlewares/userValidation';

const userRouter = Router();

const userController = new UserController();
userRouter.post('/users', newUserValidation, userController.create);

export default userRouter;