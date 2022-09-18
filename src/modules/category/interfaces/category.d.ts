import { Category } from '../entities/category.entity';

export interface ICategory extends IEntity {
  name?: string;
  hasChild?: boolean;
  parent?: Category;
}
