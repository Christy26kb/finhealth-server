import {
  Body,
  Controller,
  Get,
  Put,
  Param,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getAllUsers() {
    return await this.usersService.getAllUsers();
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  async login(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.updateUser(id, updateUserDto);
  }
}
