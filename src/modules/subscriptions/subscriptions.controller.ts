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

import { SubscriptionsService } from './subscriptions.service';
import { JwtAuthGuard } from '../auth/guards/auth.guard';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
import { Permissions } from '../auth/decorators/permissions.decorator';
import { Actions, ENTITIES, ROLES } from '../auth/constants/roles';
import { CreateSubscriptionDto } from './dtos/create-subscription.dto';
import { UpdateSubscriptionDto } from './dtos/update-subscription.dto';
import { extractProfileIds } from 'src/common/utils/profile-utils';

@Controller('subscriptions')
@UseGuards(JwtAuthGuard)
export class SubscriptionsController {
  constructor(private subscriptionsService: SubscriptionsService) {}

  @Get()
  @Permissions(
    ROLES.USER,
    ENTITIES.SUBSCRIPTIONS,
    Actions[ENTITIES.SUBSCRIPTIONS].canReadAll,
  )
  @UseGuards(PermissionsGuard)
  async findAllSubscriptions(
    @Query('profile_id') profileId: string,
    @Req() req,
  ) {
    return await this.subscriptionsService.findAll(
      profileId,
      extractProfileIds(req),
    );
  }

  @Post()
  @Permissions(
    ROLES.USER,
    ENTITIES.SUBSCRIPTIONS,
    Actions[ENTITIES.SUBSCRIPTIONS].canCreate,
  )
  @UseGuards(PermissionsGuard)
  @UsePipes(ValidationPipe)
  async createSubscription(
    @Body() createSubscriptionDto: CreateSubscriptionDto,
    @Req() req,
  ) {
    return await this.subscriptionsService.create(
      createSubscriptionDto,
      extractProfileIds(req),
    );
  }

  @Get(':id')
  @Permissions(
    ROLES.USER,
    ENTITIES.SUBSCRIPTIONS,
    Actions[ENTITIES.SUBSCRIPTIONS].canRead,
  )
  @UseGuards(PermissionsGuard)
  @UsePipes(ValidationPipe)
  async findSubscription(
    @Param('id') id: string,
    @Query('profile_id') profileId: string,
    @Req() req,
  ) {
    return await this.subscriptionsService.findOne(
      id,
      profileId,
      extractProfileIds(req),
    );
  }

  @Put(':id')
  @Permissions(
    ROLES.USER,
    ENTITIES.SUBSCRIPTIONS,
    Actions[ENTITIES.SUBSCRIPTIONS].canUpdate,
  )
  @UseGuards(PermissionsGuard)
  @UsePipes(ValidationPipe)
  async updateSubscription(
    @Param('id') id: string,
    @Body() updateSubscriptionDto: UpdateSubscriptionDto,
    @Req() req,
  ) {
    return await this.subscriptionsService.update(
      id,
      updateSubscriptionDto,
      extractProfileIds(req),
    );
  }

  @Delete(':id')
  @Permissions(
    ROLES.USER,
    ENTITIES.SUBSCRIPTIONS,
    Actions[ENTITIES.SUBSCRIPTIONS].canDelete,
  )
  @UseGuards(PermissionsGuard)
  @UsePipes(ValidationPipe)
  async deleteSubscription(
    @Param('id') id: string,
    @Query('profile_id') profileId: string,
    @Req() req,
  ) {
    return await this.subscriptionsService.remove(
      id,
      profileId,
      extractProfileIds(req),
    );
  }
}
