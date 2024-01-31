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
} from '@nestjs/common';

import { IncomesService } from './incomes.service';
import { JwtAuthGuard } from '../auth/guards/auth.guard';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
import { Permissions } from '../auth/decorators/permissions.decorator';
import { Actions, ENTITIES, ROLES } from '../auth/constants/roles';
import { CreateIncomeDto } from './dtos/create-income.dto';
import { UpdateIncomeDto } from './dtos/update-income.dto';
import { extractProfileIds } from 'src/common/utils/profile-utils';

@Controller('incomes')
@UseGuards(JwtAuthGuard)
export class IncomesController {
  constructor(private incomesService: IncomesService) {}

  @Get()
  @Permissions(
    ROLES.USER,
    ENTITIES.INCOMES,
    Actions[ENTITIES.INCOMES].canReadAll,
  )
  @UseGuards(PermissionsGuard)
  async findAllIncomes(@Query('profile_id') profileId: string, @Req() req) {
    return await this.incomesService.findAll(profileId, extractProfileIds(req));
  }

  @Post()
  @Permissions(
    ROLES.USER,
    ENTITIES.INCOMES,
    Actions[ENTITIES.INCOMES].canCreate,
  )
  @UseGuards(PermissionsGuard)
  @UsePipes(ValidationPipe)
  async createIncome(@Body() createIncomeDto: CreateIncomeDto, @Req() req) {
    return await this.incomesService.create(
      createIncomeDto,
      extractProfileIds(req),
    );
  }

  @Get(':id')
  @Permissions(ROLES.USER, ENTITIES.INCOMES, Actions[ENTITIES.INCOMES].canRead)
  @UseGuards(PermissionsGuard)
  @UsePipes(ValidationPipe)
  async findIncome(
    @Param('id') id: string,
    @Query('profile_id') profileId: string,
    @Req() req,
  ) {
    return await this.incomesService.findOne(
      id,
      profileId,
      extractProfileIds(req),
    );
  }

  @Put(':id')
  @Permissions(
    ROLES.USER,
    ENTITIES.INCOMES,
    Actions[ENTITIES.INCOMES].canUpdate,
  )
  @UseGuards(PermissionsGuard)
  @UsePipes(ValidationPipe)
  async updateIncome(
    @Param('id') id: string,
    @Body() updateIncomeDto: UpdateIncomeDto,
    @Req() req,
  ) {
    return await this.incomesService.update(
      id,
      updateIncomeDto,
      extractProfileIds(req),
    );
  }

  @Delete(':id')
  @Permissions(
    ROLES.USER,
    ENTITIES.INCOMES,
    Actions[ENTITIES.INCOMES].canDelete,
  )
  @UseGuards(PermissionsGuard)
  @UsePipes(ValidationPipe)
  async deleteIncome(
    @Param('id') id: string,
    @Query('profile_id') profileId: string,
    @Req() req,
  ) {
    return await this.incomesService.remove(
      id,
      profileId,
      extractProfileIds(req),
    );
  }
}
