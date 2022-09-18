import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategoryInput, UpdateCategoryInput } from './dto/category.dto';
import { Category } from './entities/category.entity';
import { CategoryDocument } from './Schemas/category.schema';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}

  getAllCategory() {
    return this.categoryModel.find();
  }

  async createCategory(input: CreateCategoryInput): Promise<Category | null> {
    // const foundCategory = await this.getCategoryByName(input.name);
    const foundCategory = this.categoryModel.findOne({ name: input.name });
    try {
      if (foundCategory) {
        const newCategory = new this.categoryModel(input);
        await newCategory.save();
        return newCategory;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  updateCategory(input: UpdateCategoryInput) {}

  deleteCategory() {}

  async deleteAllCategory() {
    return await this.categoryModel.find().deleteMany().exec();
  }
}
