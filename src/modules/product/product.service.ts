import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { slugConvert } from 'src/utils/slugConvert';
import { User } from '../user/entities/user.entity';
import { CreateProductInput, UpdateProductInput } from './dto/product.dto';
import { Product } from './entities/product.enties';
import { ProductDocument } from './schemas/product.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async getAllProduct(
    page: number,
    limit: number,
    keyword: string,
  ): Promise<{ result: Product[]; count: number }> {
    let filter = {};

    if (keyword) {
      filter = {
        slug: {
          $regex: keyword,
        },
      };
    } else {
      filter = {};
    }

    try {
      const result = await this.productModel
        .find(filter)
        .skip((page - 1) * limit)
        .limit(limit);
      const count = await this.productModel.count();
      return { result, count };
    } catch (error) {
      console.log('errorr : ', error);

      return { result: [], count: 0 };
    }
  }

  async getAllProductByFilter(category: string) {
    return this.productModel.find({ category });
  }

  async getProductById(id: string) {
    return await this.productModel.findById(id).exec();
  }

  async getProductBySlug(slug: string): Promise<any> {
    return await this.productModel.find({ slug });
  }

  async getManyProductById(ids: string[]) {
    return this.productModel.find({
      _id: { $in: [ids.map((id) => id)] },
    });
  }

  async createProduct(
    input: CreateProductInput,
    userInput: User,
  ): Promise<Product> {
    const productName = input.name;
    const productSlug = slugConvert(productName);
    const { amount } = input;
    //
    input.slug = productSlug;
    input.createdBy = userInput;

    if (!amount) {
      input = { ...input, amount: 1 };
    }
    const newProduct = await this.productModel.create(input);

    return await newProduct.save();
  }

  async updateProduct(
    input: UpdateProductInput,
    id: string,
    userInput: User,
  ): Promise<Product> {
    const findProduct = await this.productModel.findById(id);
    const productName = findProduct.name;
    const productSlug = slugConvert(productName);

    input.slug = productSlug;
    try {
      if (findProduct) {
        const updatedProduct = await this.productModel.findByIdAndUpdate(id, {
          ...input,
          images: [input.images],
          slug: input.slug,
          amount: input.amount,
        });
        return await updatedProduct.save();
      }
      return null;
    } catch (error) {
      console.log('errror', error);
      throw new BadRequestException('Errror return from trycatch block');
    }
  }

  async deleteProduct(_id: string, user: User): Promise<boolean> {
    const findProduct = await this.productModel.findByIdAndRemove(_id);
    if (findProduct && findProduct.createdBy._id === user._id) return true;
    return false;
  }

  async deleteAllProduct(): Promise<Product[]> {
    return await this.productModel.find().deleteMany().exec();
  }

  async updateAllProduct() {
    return await this.productModel.updateMany({
      amount: 10,
    });
  }
}
