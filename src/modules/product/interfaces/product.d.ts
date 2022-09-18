import { Types } from 'mongoose';
import { StatusEnum } from 'src/constants/enum';
import { Category } from 'src/modules/category/entities/category.entity';
import { User } from 'src/modules/user/entities/user.entity';

export interface IProduct extends IEntity {
  name?: string;
  images?: string[];
  status?: StatusEnum;
  price?: string;
  rating?: number;
  desription?: string;
  category?: Category;
  createdBy?: User;
}
