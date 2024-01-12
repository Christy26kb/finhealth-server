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
} from '@nestjs/common';

import { ProfilesService } from './profiles.service';
import { JwtAuthGuard } from '../auth/guards/auth.guard';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
import { Permissions } from '../auth/decorators/permissions.decorator';
import { Actions, ENTITIES, ROLES } from '../auth/constants/roles';
import { CreateProfileDto } from './dtos/create-profile.dto';
import { UpdateProfileDto } from './dtos/update-profile.dto';

@Controller('profiles')
@UseGuards(JwtAuthGuard)
export class ProfilesController {
  constructor(private profilesService: ProfilesService) {}

  @Get()
  @Permissions(
    ROLES.USER,
    ENTITIES.PROFILES,
    Actions[ENTITIES.PROFILES].canReadAll,
  )
  @UseGuards(PermissionsGuard)
  async findAllProfiles(@Req() req) {
    return await this.profilesService.findAll(req.user.id);
  }

  @Post()
  @Permissions(
    ROLES.USER,
    ENTITIES.PROFILES,
    Actions[ENTITIES.PROFILES].canCreate,
  )
  @UseGuards(PermissionsGuard)
  async createProfile(@Body() createProfileDto: CreateProfileDto) {
    return await this.profilesService.create(createProfileDto);
  }

  @Get(':id')
  @Permissions(
    ROLES.USER,
    ENTITIES.PROFILES,
    Actions[ENTITIES.PROFILES].canRead,
  )
  @UseGuards(PermissionsGuard)
  @UsePipes(ValidationPipe)
  async findProfile(@Param('id') id: string, @Req() req) {
    return await this.profilesService.findOne(req.user.id, id);
  }

  @Put(':id')
  @Permissions(
    ROLES.USER,
    ENTITIES.PROFILES,
    Actions[ENTITIES.PROFILES].canUpdate,
  )
  @UseGuards(PermissionsGuard)
  @UsePipes(ValidationPipe)
  async updateProfile(
    @Param('id') id: string,
    @Req() req,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return await this.profilesService.update(req.user.id, id, updateProfileDto);
  }

  @Delete(':id')
  @Permissions(
    ROLES.USER,
    ENTITIES.PROFILES,
    Actions[ENTITIES.PROFILES].canDelete,
  )
  @UseGuards(PermissionsGuard)
  @UsePipes(ValidationPipe)
  async deleteProfile(@Param('id') id: string, @Req() req) {
    return await this.profilesService.remove(req.user.id, id);
  }
}
