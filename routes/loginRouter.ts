import { Router } from 'express';
import LoginController from '../controllers/loginController';
import loginValidation from '../middlewares/loginValidation';

const loginRouter = Router();

const loginController = new LoginController();
loginRouter.post('/login', loginValidation, loginController.login);

export default loginRouter;