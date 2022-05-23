import { Router } from 'express';
import ProductController from '../controllers/productController';
import newProductValidation from '../middlewares/productValidations';

const router = Router();

const productController = new ProductController();
router.get('/products', productController.getAll);
router.post('/products', newProductValidation, productController.create);

export default router;