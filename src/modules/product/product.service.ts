import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { slugConvert } from 'src/utils/slugConvert';
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

  //
  async createProduct(input: CreateProductInput): Promise<Product> {
    const productName = input.name;
    const productSlug = slugConvert(productName);

    input.slug = productSlug;
    const newProduct = await this.productModel.create(input);

    return await newProduct.save();
  }

  async updateProduct(
    input: UpdateProductInput,
    _id: string,
  ): Promise<Product> {
    const findProduct = await this.productModel.findById(_id);
    console.log(findProduct);
    const productName = findProduct.name;
    const productSlug = slugConvert(productName);

    input.slug = productSlug;
    console.log('input slug : ', input.slug);

    if (findProduct) {
      const updatedProduct = await this.productModel.findByIdAndUpdate(_id, {
        ...input,
        slug: input.slug,
      });
      return await updatedProduct.save();
    }
    return null;
  }

  async deleteProduct(_id: string): Promise<boolean> {
    const findProduct = this.productModel.findByIdAndRemove(_id);
    if (findProduct) return true;
    return false;
  }

  async deleteAllProduct(): Promise<Product[]> {
    return await this.productModel.find().deleteMany().exec();
  }

  async createProducts(inputs: CreateProductInput[]): Promise<Product[]> {
    const products: Product[] = [];

    inputs.map(async (input) => {
      const product = await this.createProduct(input);
      products.push(product);
    });

    return products;
  }
}
