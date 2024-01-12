import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dtos/create-profile.dto';
import { UpdateProfileDto } from './dtos/update-profile.dto';
import { PrismaService } from '../../config/db/prisma/prisma.service';

@Injectable()
export class ProfilesService {
  constructor(private prismaService: PrismaService) {}

  async create(createProfileDto: CreateProfileDto) {
    return await this.prismaService.profiles.create({
      data: createProfileDto,
    });
  }

  async findAll(id: string) {
    return await this.prismaService.profiles.findMany({
      where: {
        user_id: id,
      },
    });
  }

  async findOne(userId: string, id: string) {
    return await this.prismaService.profiles.findUnique({
      where: {
        user_id: userId,
        id,
      },
    });
  }

  async update(userId: string, id: string, updateProfileDto: UpdateProfileDto) {
    const { name } = updateProfileDto;
    return await this.prismaService.profiles.update({
      where: {
        user_id: userId,
        id,
      },
      data: {
        name,
      },
    });
  }

  async remove(userId: string, id: string) {
    return this.prismaService.profiles.delete({
      where: {
        user_id: userId,
        id,
      },
    });
  }
}
