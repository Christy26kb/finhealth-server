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

  async create(createUserDto: CreateUserDto) {
    const { name, email, id } = createUserDto;
    return await this.prismaService.users.create({
      data: {
        id,
        name,
        email,
      },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const { name } = updateUserDto;
    return await this.prismaService.users.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });
  }

  async findAll() {
    return await this.prismaService.users.findMany({
      include: {
        profiles: true,
        feedbacks: true,
      },
    });
  }

  async findOne(id: string) {
    return await this.prismaService.users.findUnique({
      where: {
        id,
      },
      include: {
        profiles: true,
        feedbacks: true,
      },
    });
  }
}
