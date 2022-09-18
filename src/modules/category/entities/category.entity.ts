import { Prop } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { ICategory } from '../interfaces/category';

export class Category implements ICategory {
  @Prop()
  _id: string;

  @Prop()
  name?: string;

  @Prop()
  hasChild?: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Category.name })
  parent?: Category;

  @Prop({ default: Date.now() })
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}
