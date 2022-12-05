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
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { Roles } from 'src/common/decorators/role.decorator';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { AuthenticationGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { RoleEnum } from 'src/constants/enum';
import { User } from '../user/entities/user.entity';
import {
  CreateProductInput,
  FilterProductInput,
  GetProductFilterInput,
  PaginationInput,
  TestingInput,
  UpdateProductInput,
} from './dto/product.dto';
import { Product } from './entities/product.enties';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('findMany')
  async getMany(@Body() input: TestingInput) {
    const { ids } = input;
    return await this.productService.getManyProductById(ids);
  }

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
  @Put('/:id')
  async updateProduct(
    @Res() res: Response,
    @Body() input: UpdateProductInput,
    @Param('id') id: string,
    @CurrentUser() user: User,
  ) {
    const updatedProduct = await this.productService.updateProduct(
      input,
      id,
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
  async getAllProduct(@Query() filterProducts: GetProductFilterInput) {
    const { keyword, limit, page } = filterProducts;
    return await this.productService.getAllProduct(page, limit, keyword);
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

  // @Put('/update/all')
  // async updateAll() {
  //   return await this.productService.updateAllProduct();
  // }
}
