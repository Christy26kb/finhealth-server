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

import { LendsService } from './lends.service';
import { JwtAuthGuard } from '../auth/guards/auth.guard';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
import { Permissions } from '../auth/decorators/permissions.decorator';
import { Actions, ENTITIES, ROLES } from '../auth/constants/roles';
import { CreateLendDto } from './dtos/create-lend.dto';
import { UpdateLendDto } from './dtos/update-lend.dto';
import { extractProfileIds } from 'src/common/utils/profile-utils';

@Controller('lends')
@UseGuards(JwtAuthGuard)
export class LendsController {
  constructor(private lendsService: LendsService) {}

  @Get()
  @Permissions(ROLES.USER, ENTITIES.LENDS, Actions[ENTITIES.LENDS].canReadAll)
  @UseGuards(PermissionsGuard)
  async findAllLends(@Query('profile_id') profileId: string, @Req() req) {
    return await this.lendsService.findAll(profileId, extractProfileIds(req));
  }

  @Post()
  @Permissions(ROLES.USER, ENTITIES.LENDS, Actions[ENTITIES.LENDS].canCreate)
  @UseGuards(PermissionsGuard)
  @UsePipes(ValidationPipe)
  async createLend(@Body() createLendDto: CreateLendDto, @Req() req) {
    return await this.lendsService.create(
      createLendDto,
      extractProfileIds(req),
    );
  }

  @Get(':id')
  @Permissions(ROLES.USER, ENTITIES.LENDS, Actions[ENTITIES.LENDS].canRead)
  @UseGuards(PermissionsGuard)
  @UsePipes(ValidationPipe)
  async findLend(
    @Param('id') id: string,
    @Query('profile_id') profileId: string,
    @Req() req,
  ) {
    return await this.lendsService.findOne(
      id,
      profileId,
      extractProfileIds(req),
    );
  }

  @Put(':id')
  @Permissions(ROLES.USER, ENTITIES.LENDS, Actions[ENTITIES.LENDS].canUpdate)
  @UseGuards(PermissionsGuard)
  @UsePipes(ValidationPipe)
  async updateLend(
    @Param('id') id: string,
    @Body() updateLendDto: UpdateLendDto,
    @Req() req,
  ) {
    return await this.lendsService.update(
      id,
      updateLendDto,
      extractProfileIds(req),
    );
  }

  @Delete(':id')
  @Permissions(ROLES.USER, ENTITIES.LENDS, Actions[ENTITIES.LENDS].canDelete)
  @UseGuards(PermissionsGuard)
  @UsePipes(ValidationPipe)
  async deleteLend(
    @Param('id') id: string,
    @Query('profile_id') profileId: string,
    @Req() req,
  ) {
    return await this.lendsService.remove(
      id,
      profileId,
      extractProfileIds(req),
    );
  }
}
