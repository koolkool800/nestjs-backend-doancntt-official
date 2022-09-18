import { Prop } from '@nestjs/mongoose';
import { IsNotEmpty } from 'class-validator';
import { Category } from '../entities/category.entity';
import { ICategory } from '../interfaces/category';

export class BaseCategory {
  @Prop()
  hasChild: boolean;

  @Prop()
  parent: Category;
}

export class CreateCategoryInput {
  @Prop()
  @IsNotEmpty()
  name: string;
}

export class UpdateCategoryInput extends BaseCategory {
  @Prop()
  name: string;
}
