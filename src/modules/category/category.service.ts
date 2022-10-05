import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { slugConvert } from 'src/utils/slugConvert';
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
    const { parent } = input;

    const foundCategory = this.categoryModel.findOne({ name: input.name });
    console.log('found category ', foundCategory);

    try {
      if (foundCategory) {
        let newCategory = new this.categoryModel(input);
        newCategory.slug = slugConvert(input.name);
        await newCategory.save();
        if (parent) {
          const categoryFather = await this.categoryModel.findById(parent);
          categoryFather.hasChild = true;
          await categoryFather.save();
        }
        return newCategory;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async updateCategory(input: UpdateCategoryInput) {
    const findCategory = await this.categoryModel.findOne({ name: input.name });

    if (findCategory) {
      findCategory.slug = slugConvert(input.name);

      return await findCategory.save();
    }
    return null;
  }

  deleteCategory() {}

  async deleteAllCategory() {
    return await this.categoryModel.find().deleteMany().exec();
  }
}
