import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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

  async getAllProduct(): Promise<Product[]> {
    return this.productModel.find();
  }

  async getProductById(id: string) {
    return await this.productModel.findById(id).exec();
  }

  async getProductBySlug(slug: string): Promise<any> {
    return await this.productModel.find({ slug });
  }

  async createProduct(
    input: CreateProductInput,
    userInput: User,
  ): Promise<Product> {
    const productName = input.name;
    const productSlug = slugConvert(productName);
    //
    input.slug = productSlug;
    input.createdBy = userInput;

    const newProduct = await this.productModel.create(input);

    return await newProduct.save();
  }

  async updateProduct(
    input: UpdateProductInput,
    _id: string,
    userInput: User,
  ): Promise<Product> {
    const findProduct = await this.productModel.findById(_id);
    console.log(findProduct);
    const productName = findProduct.name;
    const productSlug = slugConvert(productName);

    input.slug = productSlug;
    console.log('input slug : ', input.slug);

    if (findProduct && findProduct.createdBy._id === userInput._id) {
      const updatedProduct = await this.productModel.findByIdAndUpdate(_id, {
        ...input,
        slug: input.slug,
      });
      return await updatedProduct.save();
    }
    return null;
  }

  async deleteProduct(_id: string, user: User): Promise<boolean> {
    const findProduct = await this.productModel.findByIdAndRemove(_id);
    if (findProduct && findProduct.createdBy._id === user._id) return true;
    return false;
  }

  async deleteAllProduct(): Promise<Product[]> {
    return await this.productModel.find().deleteMany().exec();
  }
}
