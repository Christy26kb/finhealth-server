import {
  Body,
  Controller,
  Get,
  Put,
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

  @Get()
  @Permissions(ROLES.ADMIN, ENTITIES.USERS, Actions[ENTITIES.USERS].canReadAll)
  @UseGuards(PermissionsGuard)
  async findAllUsers() {
    return await this.usersService.findAllUsers();
  }

  @Get(':id')
  @Permissions(ROLES.USER, ENTITIES.USERS, Actions[ENTITIES.USERS].canRead)
  @UseGuards(PermissionsGuard)
  @UsePipes(ValidationPipe)
  async findUser(@Param('id') id: string) {
    return await this.usersService.findUser(id);
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.usersService.updateUser(id, updateUserDto);
  }
}
