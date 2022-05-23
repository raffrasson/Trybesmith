import { Router } from 'express';
import ProductController from '../controllers/productController';
import newProductValidation from '../middlewares/productValidations';

const productRouter = Router();

const productController = new ProductController();
productRouter.get('/products', productController.getAll);
productRouter.post('/products', newProductValidation, productController.create);

export default productRouter;