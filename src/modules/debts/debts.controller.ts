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

import { DebtsService } from './debts.service';
import { JwtAuthGuard } from '../auth/guards/auth.guard';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
import { Permissions } from '../auth/decorators/permissions.decorator';
import { Actions, ENTITIES, ROLES } from '../auth/constants/roles';
import { CreateDebtDto } from './dtos/create-debt.dto';
import { UpdateDebtDto } from './dtos/update-debt.dto';
import { extractProfileIds } from 'src/common/utils/profile-utils';

@Controller('debts')
@UseGuards(JwtAuthGuard)
export class DebtsController {
  constructor(private debtsService: DebtsService) {}

  @Get()
  @Permissions(ROLES.USER, ENTITIES.DEBTS, Actions[ENTITIES.DEBTS].canReadAll)
  @UseGuards(PermissionsGuard)
  async findAllDebts(@Query('profile_id') profileId: string, @Req() req) {
    return await this.debtsService.findAll(profileId, extractProfileIds(req));
  }

  @Post()
  @Permissions(ROLES.USER, ENTITIES.DEBTS, Actions[ENTITIES.DEBTS].canCreate)
  @UseGuards(PermissionsGuard)
  @UsePipes(ValidationPipe)
  async createDebt(@Body() createDebtDto: CreateDebtDto, @Req() req) {
    return await this.debtsService.create(
      createDebtDto,
      extractProfileIds(req),
    );
  }

  @Get(':id')
  @Permissions(ROLES.USER, ENTITIES.DEBTS, Actions[ENTITIES.DEBTS].canRead)
  @UseGuards(PermissionsGuard)
  @UsePipes(ValidationPipe)
  async findDebt(
    @Param('id') id: string,
    @Query('profile_id') profileId: string,
    @Req() req,
  ) {
    return await this.debtsService.findOne(
      id,
      profileId,
      extractProfileIds(req),
    );
  }

  @Put(':id')
  @Permissions(ROLES.USER, ENTITIES.DEBTS, Actions[ENTITIES.DEBTS].canUpdate)
  @UseGuards(PermissionsGuard)
  @UsePipes(ValidationPipe)
  async updateDebt(
    @Param('id') id: string,
    @Body() updateDebtDto: UpdateDebtDto,
    @Req() req,
  ) {
    return await this.debtsService.update(
      id,
      updateDebtDto,
      extractProfileIds(req),
    );
  }

  @Delete(':id')
  @Permissions(ROLES.USER, ENTITIES.DEBTS, Actions[ENTITIES.DEBTS].canDelete)
  @UseGuards(PermissionsGuard)
  @UsePipes(ValidationPipe)
  async deleteDebt(
    @Param('id') id: string,
    @Query('profile_id') profileId: string,
    @Req() req,
  ) {
    return await this.debtsService.remove(
      id,
      profileId,
      extractProfileIds(req),
    );
  }
}
