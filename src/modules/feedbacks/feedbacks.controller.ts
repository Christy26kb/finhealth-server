import {
  Req,
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  UsePipes,
  UseGuards,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';

import { FeedbacksService } from './feedbacks.service';
import { JwtAuthGuard } from '../auth/guards/auth.guard';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
import { Permissions } from '../auth/decorators/permissions.decorator';
import { Actions, ENTITIES, ROLES } from '../auth/constants/roles';
import { CreateFeedbackDto } from './dtos/create-feedback.dto';
import { UpdateFeedbackDto } from './dtos/update-feedback.dto';

@Controller('feedbacks')
@UseGuards(JwtAuthGuard)
export class FeedbacksController {
  constructor(private feedbacksService: FeedbacksService) {}

  @Get()
  @Permissions(
    ROLES.USER,
    ENTITIES.FEEDBACKS,
    Actions[ENTITIES.FEEDBACKS].canReadAll,
  )
  @UseGuards(PermissionsGuard)
  async findAllFeeedbacks(@Req() req) {
    return await this.feedbacksService.findAll(req.user.id);
  }

  @Post()
  @Permissions(
    ROLES.USER,
    ENTITIES.FEEDBACKS,
    Actions[ENTITIES.FEEDBACKS].canCreate,
  )
  @UseGuards(PermissionsGuard)
  @UsePipes(ValidationPipe)
  async createFeedback(
    @Body() createFeedbackDto: CreateFeedbackDto,
    @Req() req,
  ) {
    return await this.feedbacksService.create(createFeedbackDto, req.user.id);
  }

  @Get(':id')
  @Permissions(
    ROLES.USER,
    ENTITIES.FEEDBACKS,
    Actions[ENTITIES.FEEDBACKS].canRead,
  )
  @UseGuards(PermissionsGuard)
  @UsePipes(ValidationPipe)
  async findFeedback(@Param('id', ParseIntPipe) id: number, @Req() req) {
    return await this.feedbacksService.findOne(id, req.user.id);
  }

  @Put(':id')
  @Permissions(
    ROLES.USER,
    ENTITIES.FEEDBACKS,
    Actions[ENTITIES.FEEDBACKS].canUpdate,
  )
  @UseGuards(PermissionsGuard)
  @UsePipes(ValidationPipe)
  async updateFeedback(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFeedbackDto: UpdateFeedbackDto,
    @Req() req,
  ) {
    return await this.feedbacksService.update(
      id,
      updateFeedbackDto,
      req.user.id,
    );
  }

  @Delete(':id')
  @Permissions(
    ROLES.USER,
    ENTITIES.FEEDBACKS,
    Actions[ENTITIES.FEEDBACKS].canDelete,
  )
  @UseGuards(PermissionsGuard)
  @UsePipes(ValidationPipe)
  async deleteFeedback(@Param('id', ParseIntPipe) id: number, @Req() req) {
    return await this.feedbacksService.remove(id, req.user.id);
  }
}
