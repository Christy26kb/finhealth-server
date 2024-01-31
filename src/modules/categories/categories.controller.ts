import {
  Req,
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Query,
  UsePipes,
  UseGuards,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';

import { CategoriesService } from './categories.service';
import { JwtAuthGuard } from '../auth/guards/auth.guard';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
import { Permissions } from '../auth/decorators/permissions.decorator';
import { Actions, ENTITIES, ROLES } from '../auth/constants/roles';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';
import { extractProfileIds } from 'src/common/utils/profile-utils';

@Controller('categories')
@UseGuards(JwtAuthGuard)
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  @Permissions(
    ROLES.USER,
    ENTITIES.CATEGORIES,
    Actions[ENTITIES.CATEGORIES].canReadAll,
  )
  @UseGuards(PermissionsGuard)
  async findAllCategories(@Query('profile_id') profileId: string, @Req() req) {
    return await this.categoriesService.findAll(
      profileId,
      extractProfileIds(req),
    );
  }

  @Post()
  @Permissions(
    ROLES.USER,
    ENTITIES.CATEGORIES,
    Actions[ENTITIES.CATEGORIES].canCreate,
  )
  @UseGuards(PermissionsGuard)
  @UsePipes(ValidationPipe)
  async createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
    @Req() req,
  ) {
    return await this.categoriesService.create(
      createCategoryDto,
      extractProfileIds(req),
    );
  }

  @Get(':id')
  @Permissions(
    ROLES.USER,
    ENTITIES.CATEGORIES,
    Actions[ENTITIES.CATEGORIES].canRead,
  )
  @UseGuards(PermissionsGuard)
  @UsePipes(ValidationPipe)
  async findCategory(
    @Param('id', ParseIntPipe) id: number,
    @Query('profile_id') profileId: string,
    @Req() req,
  ) {
    return await this.categoriesService.findOne(
      id,
      profileId,
      extractProfileIds(req),
    );
  }

  @Put(':id')
  @Permissions(
    ROLES.USER,
    ENTITIES.CATEGORIES,
    Actions[ENTITIES.CATEGORIES].canUpdate,
  )
  @UseGuards(PermissionsGuard)
  @UsePipes(ValidationPipe)
  async updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @Req() req,
  ) {
    return await this.categoriesService.update(
      id,
      updateCategoryDto,
      extractProfileIds(req),
    );
  }

  @Delete(':id')
  @Permissions(
    ROLES.USER,
    ENTITIES.CATEGORIES,
    Actions[ENTITIES.CATEGORIES].canDelete,
  )
  @UseGuards(PermissionsGuard)
  @UsePipes(ValidationPipe)
  async deleteIncome(
    @Param('id', ParseIntPipe) id: number,
    @Query('profile_id') profileId: string,
    @Req() req,
  ) {
    return await this.categoriesService.remove(
      id,
      profileId,
      extractProfileIds(req),
    );
  }
}
