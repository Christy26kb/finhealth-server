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

import { ExpensesService } from './expenses.service';
import { JwtAuthGuard } from '../auth/guards/auth.guard';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
import { Permissions } from '../auth/decorators/permissions.decorator';
import { Actions, ENTITIES, ROLES } from '../auth/constants/roles';
import { CreateExpenseDto } from './dtos/create-expense.dto';
import { UpdateExpenseDto } from './dtos/update-expense.dto';
import { extractProfileIds } from 'src/common/utils/profile-utils';

@Controller('expenses')
@UseGuards(JwtAuthGuard)
export class ExpensesController {
  constructor(private expensesService: ExpensesService) {}

  @Get()
  @Permissions(
    ROLES.USER,
    ENTITIES.EXPENSES,
    Actions[ENTITIES.EXPENSES].canReadAll,
  )
  @UseGuards(PermissionsGuard)
  async findAllExpenses(@Query('profile_id') profileId: string, @Req() req) {
    return await this.expensesService.findAll(
      profileId,
      extractProfileIds(req),
    );
  }

  @Post()
  @Permissions(
    ROLES.USER,
    ENTITIES.EXPENSES,
    Actions[ENTITIES.EXPENSES].canCreate,
  )
  @UseGuards(PermissionsGuard)
  @UsePipes(ValidationPipe)
  async createExpense(@Body() createExpenseDto: CreateExpenseDto, @Req() req) {
    return await this.expensesService.create(
      createExpenseDto,
      extractProfileIds(req),
    );
  }

  @Get(':id')
  @Permissions(
    ROLES.USER,
    ENTITIES.EXPENSES,
    Actions[ENTITIES.EXPENSES].canRead,
  )
  @UseGuards(PermissionsGuard)
  @UsePipes(ValidationPipe)
  async findExpense(
    @Param('id') id: string,
    @Query('profile_id') profileId: string,
    @Req() req,
  ) {
    return await this.expensesService.findOne(
      id,
      profileId,
      extractProfileIds(req),
    );
  }

  @Put(':id')
  @Permissions(
    ROLES.USER,
    ENTITIES.EXPENSES,
    Actions[ENTITIES.EXPENSES].canUpdate,
  )
  @UseGuards(PermissionsGuard)
  @UsePipes(ValidationPipe)
  async updateExpense(
    @Param('id') id: string,
    @Body() updateExpenseDto: UpdateExpenseDto,
    @Req() req,
  ) {
    return await this.expensesService.update(
      id,
      updateExpenseDto,
      extractProfileIds(req),
    );
  }

  @Delete(':id')
  @Permissions(
    ROLES.USER,
    ENTITIES.EXPENSES,
    Actions[ENTITIES.EXPENSES].canDelete,
  )
  @UseGuards(PermissionsGuard)
  @UsePipes(ValidationPipe)
  async deleteExpense(
    @Param('id') id: string,
    @Query('profile_id') profileId: string,
    @Req() req,
  ) {
    return await this.expensesService.remove(
      id,
      profileId,
      extractProfileIds(req),
    );
  }
}
