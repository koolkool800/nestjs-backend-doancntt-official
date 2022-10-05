import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { Roles } from 'src/common/decorators/role.decorator';
import { AuthenticationGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { RoleEnum } from 'src/constants/enum';
import { CategoryService } from './category.service';
import { CreateCategoryInput, UpdateCategoryInput } from './dto/category.dto';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getAllCategory() {
    return this.categoryService.getAllCategory();
  }

  @Roles(RoleEnum.ADMIN)
  @UseGuards(AuthenticationGuard, RolesGuard)
  @Post('')
  async createCategory(
    @Res() res: Response,
    @Body() input: CreateCategoryInput,
  ) {
    const newCategory = await this.categoryService.createCategory(input);
    if (newCategory) {
      return res.status(HttpStatus.CREATED).json({
        msg: 'Created Successfully',
        data: newCategory,
      });
    }
    return res.status(HttpStatus.BAD_REQUEST).json({
      msg: 'Created failure',
      data: 'missing field or maybe this category was already exited',
    });
  }

  @Roles(RoleEnum.ADMIN)
  @UseGuards(AuthenticationGuard, RolesGuard)
  @Put('')
  async updateCategory(
    @Res() response: Response,
    @Body() input: UpdateCategoryInput,
  ) {
    const updatedCategory = await this.categoryService.updateCategory(input);

    if (updatedCategory)
      return response.status(HttpStatus.OK).json({
        msg: 'created success',
        data: updatedCategory,
      });
    return response.status(HttpStatus.BAD_REQUEST).json({
      msg: 'created failure',
      data: null,
    });
  }

  @Delete('')
  async deleteAllCategory() {
    return this.categoryService.deleteAllCategory();
  }
}
