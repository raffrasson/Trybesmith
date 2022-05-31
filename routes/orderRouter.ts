import { Router } from 'express';
import OrderController from '../controllers/orderController';
import orderValidation from '../middlewares/orderValidation';
import tokenValidation from '../middlewares/tokenValidation';

const orderRouter = Router();

const orderController = new OrderController();

orderRouter.get('/orders', orderController.getAll);
orderRouter.post(
  '/orders',
  tokenValidation,
  orderValidation, 
  orderController.create,
);

export default orderRouter;