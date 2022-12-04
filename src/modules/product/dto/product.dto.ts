import { Prop } from '@nestjs/mongoose';
import { IsNotEmpty, IsNumber, IsOptional, Min } from 'class-validator';
import { Types } from 'mongoose';
import { StatusEnum } from 'src/constants/enum';
import { Category } from 'src/modules/category/entities/category.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { IProduct } from '../interfaces/product';

export class BaseProductInput implements IProduct {
  @Prop()
  name: string;

  @Prop()
  images: string[];

  @Prop()
  status: StatusEnum;

  @Prop()
  price: string;

  @Prop()
  rating: number;

  @Prop()
  desription: string;

  @Prop()
  category: Category;

  @Prop()
  createdBy: User;

  @Prop()
  slug?: string;
}

export class CreateProductInput implements Partial<BaseProductInput> {
  @Prop()
  @IsNotEmpty()
  name: string;

  @Prop()
  @IsNotEmpty()
  images: string[];

  @Prop()
  price: string;

  @Prop()
  amount: number;

  @Prop()
  status?: StatusEnum;

  @Prop()
  desription?: string;

  @Prop()
  @IsNotEmpty()
  category: Category;

  @Prop()
  @IsNotEmpty()
  createdBy: User;

  @Prop()
  slug?: string;
}
export class UpdateProductInput implements Partial<BaseProductInput> {
  @Prop()
  name?: string;

  @Prop()
  images?: string[];

  @Prop()
  price?: string;

  @Prop()
  amount?: number;

  @Prop()
  status?: StatusEnum;

  @Prop()
  desription?: string;

  @Prop()
  category?: Category;

  @Prop()
  createdBy?: User;

  @Prop()
  slug?: string;
}

export class FilterProductInput {
  category?: Category;
}

export class PaginationInput {
  @IsOptional()
  @IsNumber()
  @Min(1)
  page?: number;

  @IsOptional()
  @IsNumber()
  @Min(10)
  limit?: number;
}

export class GetProductFilterInput {
  @Prop()
  page: number;

  @Prop()
  limit: number;

  @Prop()
  keyword: string;
}
