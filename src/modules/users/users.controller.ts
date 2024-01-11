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

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async findAllUsers() {
    return await this.usersService.findAllUsers();
  }

  @Get(':id')
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
