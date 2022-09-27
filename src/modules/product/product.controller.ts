import {
  Body,
  Controller,
  Delete,
  Get,
  HostParam,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateProductInput, UpdateProductInput } from './dto/product.dto';
import { Product } from './entities/product.enties';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/:slug')
  async getProductBySlug(@Res() res: Response, @Param('slug') slug: string) {
    const product: Product = await this.productService.getProductBySlug(slug);
    if (product) {
      return res.status(HttpStatus.OK).json({
        msg: 'Get success',
        data: product,
      });
    }
    return res.status(HttpStatus.BAD_REQUEST).json({
      msg: 'Get failure',
      data: null,
    });
  }

  @Post('/createProducts')
  async createProducts(@Body() inputs: CreateProductInput[]) {
    return await this.productService.createProducts(inputs);
  }

  @Post('')
  async createProduct(@Body() input: CreateProductInput) {
    return await this.productService.createProduct(input);
  }

  @Put('')
  async updateProduct(
    @Res() res: Response,
    @Body() input: UpdateProductInput,
    @Body() id: string,
  ) {
    const updatedProduct = await this.productService.updateProduct(input, id);
    if (updatedProduct)
      return res.status(HttpStatus.OK).json({
        msg: 'updated success',
        data: updatedProduct.slug,
      });
    return res.status(HttpStatus.BAD_REQUEST).json({
      msg: 'updated fail',
      data: null,
    });
  }

  @Get('')
  async getAllProduct() {
    return this.productService.getAllProduct();
  }

  @Delete('')
  async deleteProduct(@Res() res: Response, @Body() id: string) {
    return this.productService.deleteProduct(id);
  }
}
