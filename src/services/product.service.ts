// import { PipelineStage } from 'mongoose';
// import { BadRequestError, NotFoundError } from '../error/errors';
// import { IProduct } from '../models/phone.model';
// import ProductRepository from '../repositories/product.repository';

// class ProductService {
//   /**
//    * Create new product
//    */
//   async creteNewProduct(payload: IProduct): Promise<IProduct> {
//     try {

//       if (!payload.name || !payload.price || !payload.category) {
//         throw new BadRequestError('Missing required fields');
//       }
//       const productData = {
//         ...payload,
//         price: Number(payload.price),
//       } as IProduct;
//       // Create product call repository
//       return await ProductRepository.create(productData);
//     } catch (error: any) {
//       throw new Error('Error: ' + error.message);
//     }
//   }

//   /**
//    * Get products
//    */
//   async getProducts(
//     search: string | undefined,
//     page: string,
//     limit: string
//   ): Promise<
//     {
//       data: IProduct[];
//       totalCount: number;
//       page: number;
//       totalPage: number;
//     }[]
//   > {

//     try {
//       const matchCase: any = {};
//       // Search
//       if (search) {
//         matchCase.name = { $regex: search, $options: 'i' };
//       }

//       const skip = (Number(page) - 1) * Number(limit);

//       const pipeline: PipelineStage[] = [
//         { $match: matchCase },
//         {
//           $facet: {
//             data: [{ $skip: skip }, { $limit: parseInt(limit) }],
//             totalCount: [{ $count: 'count' }],
//           },
//         },
//       ];

//       return await ProductRepository.getAll(pipeline);
//     } catch (error: any) {
//       throw new Error('Error: ' + error.message);
//     }
//   }

//   /**
//    * Get product
//    */
//   async getById(id: string): Promise<IProduct> {
//     try {

//       // Check exist productID
//       const product = await ProductRepository.getById(id);
//       if (!product) {
//         throw new NotFoundError('Product not found');
//       }

//       return product;
//     } catch (error: any) {
//       throw new Error('Error: ' + error.message);
//     }
//   }

//   /**
//    * Update product
//    */
//   async updateProduct(id: string, data: Partial<IProduct>): Promise<IProduct> {
//     try {
//       // Check exist productID 
//       const product = await ProductRepository.update(id, data);
//       if (!product) {
//         throw new NotFoundError('Product not found');
//       }

//       return product;
//     } catch (error: any) {
//       throw new Error('Error: ' + error.message);
//     }
//   }

//   /**
//    * Delete product
//    */
//   async deleteProduct(id: string): Promise<boolean> {
//     try {
//       //  Check exist productID 
//       const product = await ProductRepository.getById(id);
//       if (!product) {
//         throw new NotFoundError('Product not found');
//       }
//       return await ProductRepository.delete(id);
//     } catch (error: any) {
//       throw new Error('Error: ' + error.message);
//     }
//   }
// }

// export default new ProductService();
