import { Injectable } from '@nestjs/common';

import { CreateUserDto } from './dtos/create-user.dto';
import { PrismaService } from '../../config/db/prisma/prisma.service';
import { UpdateUserDto } from './dtos/update-user.dto';
/**
 * Service dealing with Users CRUD Operations.
 *
 * @class
 */
@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async createUser(createUserDto: CreateUserDto) {
    const { name, email, id } = createUserDto;
    this.prismaService.users.create({
      data: {
        id,
        name,
        email,
      },
    });
  }

  async updateUser(updateUserDto: UpdateUserDto) {
    const { name, email, id } = updateUserDto;
    this.prismaService.users.update({
      where: {
        id,
      },
      data: {
        name,
        email,
      },
    });
  }
}
