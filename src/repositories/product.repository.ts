// import { PipelineStage } from 'mongoose';
// import ProductModel, { IProduct } from '../models/phone.model';

// class ProductRepository {
//   /**
//    * Get all products of store
//    */
//   async getAll(pipeline: PipelineStage[]): Promise<
//     {
//       data: IProduct[];
//       totalCount: number;
//       page: number;
//       totalPage: number;
//     }[]
//   > {
//     // get all products
//     return await ProductModel.aggregate(pipeline);
//   }

//   /**
//    * Get product by ID.
//    */
//   async getById(id: string) {
//     return await ProductModel.findById(id);
//   }

//   /**
//    * Create product.
//    */
//   async create(product: IProduct) {
//     const newProduct = new ProductModel(product);
//     return await newProduct.save();
//   }

//   /**
//    * Update product
//    */
//   async update(id: string, data: Partial<IProduct>): Promise<IProduct | null> {
//     return await ProductModel.findByIdAndUpdate(id, data, { new: true });
//   }

//   /**
//    * Delete a product by ID.
//    */
//   async delete(id: string): Promise<boolean> {
//     const result = await ProductModel.findByIdAndDelete(id);
//     return !!result;
//   }
// }

// export default new ProductRepository();
