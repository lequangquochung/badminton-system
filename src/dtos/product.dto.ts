import Joi from 'joi';

export const createProductDTO = Joi.object({
  name: Joi.string().required().messages({
    'string.base': 'Name must be a string',
    'any.required': 'Name is required',
  }),
  brand: Joi.string().required().messages({
    'string.base': 'Brand must be a string',
    'any.required': 'Brand is required',
  }),
  category: Joi.string().valid('smartphone', 'feature phone').required().messages({
    'any.only': 'Category must be either smartphone or feature phone',
    'any.required': 'Category is required',
  }),
  price: Joi.number().min(0).required().messages({
    'number.base': 'Price must be a number',
    'number.min': 'Price cannot be negative',
    'any.required': 'Price is required',
  }),
  storage: Joi.string().valid('64GB', '128GB', '256GB', '512GB').required().messages({
    'any.only': 'Storage must be one of: 64GB, 128GB, 256GB, or 512GB',
    'any.required': 'Storage is required',
  }),
  ram: Joi.string().valid('4GB', '6GB', '8GB', '12GB').required().messages({
    'any.only': 'RAM must be one of: 4GB, 6GB, 8GB, or 12GB',
    'any.required': 'RAM is required',
  }),
  color: Joi.string().required().messages({
    'string.base': 'Color must be a string',
    'any.required': 'Color is required',
  }),
  stock: Joi.number().min(0).required().messages({
    'number.base': 'Stock must be a number',
    'number.min': 'Stock cannot be negative',
    'any.required': 'Stock is required',
  }),
  image: Joi.string().allow('').required().messages({
    'string.base': 'Image must be a string',
    'any.required': 'Image is required',
  }),
});
