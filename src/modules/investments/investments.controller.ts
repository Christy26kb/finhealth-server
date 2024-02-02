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

import { InvestmentsService } from './investments.service';
import { JwtAuthGuard } from '../auth/guards/auth.guard';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
import { Permissions } from '../auth/decorators/permissions.decorator';
import { Actions, ENTITIES, ROLES } from '../auth/constants/roles';
import { CreateInvestmentDto } from './dtos/create-investment.dto';
import { UpdateInvestmentDto } from './dtos/update-investment.dto';
import { extractProfileIds } from 'src/common/utils/profile-utils';

@Controller('investments')
@UseGuards(JwtAuthGuard)
export class InvestmentsController {
  constructor(private investmentsService: InvestmentsService) {}

  @Get()
  @Permissions(
    ROLES.USER,
    ENTITIES.INVESTMENTS,
    Actions[ENTITIES.INVESTMENTS].canReadAll,
  )
  @UseGuards(PermissionsGuard)
  async findAllInvestments(@Query('profile_id') profileId: string, @Req() req) {
    return await this.investmentsService.findAll(
      profileId,
      extractProfileIds(req),
    );
  }

  @Post()
  @Permissions(
    ROLES.USER,
    ENTITIES.INVESTMENTS,
    Actions[ENTITIES.INVESTMENTS].canCreate,
  )
  @UseGuards(PermissionsGuard)
  @UsePipes(ValidationPipe)
  async createInvestment(
    @Body() createInvestmentDto: CreateInvestmentDto,
    @Req() req,
  ) {
    return await this.investmentsService.create(
      createInvestmentDto,
      extractProfileIds(req),
    );
  }

  @Get(':id')
  @Permissions(
    ROLES.USER,
    ENTITIES.INVESTMENTS,
    Actions[ENTITIES.INVESTMENTS].canRead,
  )
  @UseGuards(PermissionsGuard)
  @UsePipes(ValidationPipe)
  async findInvestment(
    @Param('id') id: string,
    @Query('profile_id') profileId: string,
    @Req() req,
  ) {
    return await this.investmentsService.findOne(
      id,
      profileId,
      extractProfileIds(req),
    );
  }

  @Put(':id')
  @Permissions(
    ROLES.USER,
    ENTITIES.INVESTMENTS,
    Actions[ENTITIES.INVESTMENTS].canUpdate,
  )
  @UseGuards(PermissionsGuard)
  @UsePipes(ValidationPipe)
  async updateInvestment(
    @Param('id') id: string,
    @Body() updateInvestmentDto: UpdateInvestmentDto,
    @Req() req,
  ) {
    return await this.investmentsService.update(
      id,
      updateInvestmentDto,
      extractProfileIds(req),
    );
  }

  @Delete(':id')
  @Permissions(
    ROLES.USER,
    ENTITIES.INVESTMENTS,
    Actions[ENTITIES.INVESTMENTS].canDelete,
  )
  @UseGuards(PermissionsGuard)
  @UsePipes(ValidationPipe)
  async deleteInvestment(
    @Param('id') id: string,
    @Query('profile_id') profileId: string,
    @Req() req,
  ) {
    return await this.investmentsService.remove(
      id,
      profileId,
      extractProfileIds(req),
    );
  }
}
