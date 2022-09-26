import mongoose, { Document, mongo, Schema, Types } from 'mongoose';
import { StatusEnum } from 'src/constants/enum';
import { Category } from 'src/modules/category/entities/category.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Product } from '../entities/product.enties';

export type ProductDocument = Product & Document;
export const ProductSchema = new Schema<Product>(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: Category.name,
    },
    desription: {
      type: String,
      maxlength: 500,
    },
    images: {
      type: [String],
    },
    price: {
      type: String,
    },
    rating: {
      type: Number,
    },
    status: {
      type: String,
      enum: Object.values(StatusEnum),
      default: StatusEnum.IN_STOCK,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: User.name,
    },
    slug: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);
