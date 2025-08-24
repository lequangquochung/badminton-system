import express from 'express';
import ProductController from '../controllers/product.controller';
import { validateInputProduct } from '../middlewares/validateInputProduct.middleware';


const productRouter = express.Router();

// get products
productRouter.get('/', ProductController.getAll);

// create product
productRouter.post('/', validateInputProduct, ProductController.createProduct);

// get product
productRouter.get('/:id', ProductController.getById);

// update product
productRouter.put('/:id', validateInputProduct, ProductController.update);

// delete product
productRouter.delete('/:id', ProductController.delete);

export default productRouter;
