import { Document, Schema } from 'mongoose';
import { Category } from '../entities/category.entity';

export type CategoryDocument = Category & Document;

export const CategorySchema = new Schema<Category>(
  {
    name: {
      type: String,
      unique: true,
      trim: true,
    },
    hasChild: {
      type: Boolean,
      default: false,
    },
    parent: {
      type: Schema.Types.ObjectId,
      ref: Category.name,
      default: null,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    updatedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);
