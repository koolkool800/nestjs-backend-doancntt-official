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
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { AuthenticationGuard } from 'src/common/guards/auth.guard';
import { User } from '../user/entities/user.entity';
import {
  CreateProductInput,
  FilterProductInput,
  UpdateProductInput,
} from './dto/product.dto';
import { Product } from './entities/product.enties';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/filter/:category')
  async getProductByFilter(
    @Res() res: Response,
    @Param('category') category: string,
  ) {
    const products = await this.productService.getAllProductByFilter(category);

    if (products)
      return res.status(HttpStatus.OK).json({
        data: products,
      });
    return res.status(HttpStatus.BAD_REQUEST).json({
      msg: 'Get failure',
      data: null,
    });
  }

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

  @UseGuards(AuthenticationGuard)
  @Post('')
  async createProduct(
    @Body() input: CreateProductInput,
    @CurrentUser() user: User,
  ) {
    return await this.productService.createProduct(input, user);
  }

  @UseGuards(AuthenticationGuard)
  @Put('/:_id')
  async updateProduct(
    @Res() res: Response,
    @Body() input: UpdateProductInput,
    @Param('_id') _id: string,
    @CurrentUser() user: User,
  ) {
    const updatedProduct = await this.productService.updateProduct(
      input,
      _id,
      user,
    );
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

  @UseGuards(AuthenticationGuard)
  @Delete('')
  async deleteProduct(
    @Res() res: Response,
    @Body() id: string,
    @CurrentUser() user: User,
  ) {
    console.log('user : ', user);
    return this.productService.deleteProduct(id, user);
  }
}
