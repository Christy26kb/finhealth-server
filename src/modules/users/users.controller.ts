import {
  Body,
  Controller,
  Get,
  Put,
  Req,
  Param,
  UsePipes,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';

import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/auth.guard';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
import { Permissions } from '../auth/decorators/permissions.decorator';
import { Actions, ENTITIES, ROLES } from '../auth/constants/roles';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/me')
  @Permissions(ROLES.USER, ENTITIES.USERS, Actions[ENTITIES.USERS].canRead)
  @UseGuards(PermissionsGuard)
  async findCurrentUser(@Req() req) {
    return await this.usersService.findOne(req.user.id);
  }

  @Get(':id')
  @Permissions(ROLES.USER, ENTITIES.USERS, Actions[ENTITIES.USERS].canRead)
  @UseGuards(PermissionsGuard)
  @UsePipes(ValidationPipe)
  async findUser(@Param('id') id: string) {
    return await this.usersService.findOne(id);
  }

  @Put(':id')
  @Permissions(ROLES.USER, ENTITIES.USERS, Actions[ENTITIES.USERS].canUpdate)
  @UseGuards(PermissionsGuard)
  @UsePipes(ValidationPipe)
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.usersService.update(id, updateUserDto);
  }
}
