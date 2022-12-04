import { Prop } from '@nestjs/mongoose';
import mongoose, { Schema, Types } from 'mongoose';
import { StatusEnum } from 'src/constants/enum';
import { Category } from 'src/modules/category/entities/category.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { IProduct } from '../interfaces/product';

export class Product implements IProduct {
  @Prop()
  _id: string;

  @Prop()
  name?: string;

  @Prop()
  images?: string[];

  @Prop()
  amount?: number;

  @Prop()
  desription?: string;

  @Prop()
  rating?: number;

  @Prop()
  status?: StatusEnum;

  @Prop()
  price?: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Category.name })
  category?: Category;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  createdBy?: User;

  @Prop({ default: Date.now() })
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  slug?: string;
  // publictedAt;
}
