// import { Request, Response, NextFunction } from 'express';
// import productService from '../services/product.service';
// import { sendSuccess } from '../utils/response.util';
// import { IProduct } from '../models/phone.model';
// import { HttpStatusCode } from '../utils/httpStatusCode.util';

// class ProductController {
//   /*
//    * Create product
//    */
//   async createProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
//     try {
//       // create product
//       const product: IProduct = await productService.creteNewProduct(req.body);
//       const message = 'Product created successfully';

//       sendSuccess(res, HttpStatusCode.CREATED, product, message);
//     } catch (error) {
//       next(error);
//     }
//   }

//   /*
//    * Get products
//    */
//   async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
//     try {
//       const {
//         search,
//         page = '1',
//         limit = '10',
//       } = req.query as {
//         search?: string;
//         page?: string;
//         limit?: string;
//       };

//       // Call service get products
//       const result = await productService.getProducts(
//         search,
//         page,
//         limit
//       );

//       sendSuccess(res, HttpStatusCode.OK, result);
//     } catch (error) {
//       next(error);
//     }
//   }

//   /*
//    * Get product
//    */
//   async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
//     try {
//       const product = await productService.getById(req.params.id);
//       sendSuccess(res, HttpStatusCode.OK, product);
//     } catch (error) {
//       next(error);
//     }
//   }

//   /*
//    * Update product
//    */
//   async update(req: Request, res: Response, next: NextFunction): Promise<void> {
//     try {
//       const product = await productService.updateProduct(req.params.id, req.body);
//       const message = 'Updated successfully';

//       sendSuccess(res, HttpStatusCode.OK, product, message);
//     } catch (error: any) {
//       next(error);
//     }
//   }

//   /*
//    * Delete product
//    */
//   async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
//     try {
//       const deleted = await productService.deleteProduct(req.params.id);
//       const message = 'Deleted successfully';
//       sendSuccess(res, HttpStatusCode.OK, deleted, message);
//     } catch (error: any) {
//       next(error);
//     }
//   }
// }

// export default new ProductController();
