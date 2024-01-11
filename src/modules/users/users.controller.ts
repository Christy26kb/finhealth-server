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
import { JwtAuthGuard } from '../auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  //TODO: Need to add a permissions guard for permissions validations
  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllUsers() {
    return await this.usersService.getAllUsers();
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  async login(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.updateUser(id, updateUserDto);
  }
}
