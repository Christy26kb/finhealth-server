import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dtos/create-profile.dto';
import { UpdateProfileDto } from './dtos/update-profile.dto';
import { PrismaService } from '../../config/db/prisma/prisma.service';

@Injectable()
export class ProfilesService {
  constructor(private prismaService: PrismaService) {}

  async create(createProfileDto: CreateProfileDto, userId: string) {
    return await this.prismaService.profiles.create({
      data: { ...createProfileDto, user_id: userId },
    });
  }

  async findAll(userId: string) {
    return await this.prismaService.profiles.findMany({
      where: {
        user_id: userId,
      },
    });
  }

  async findOne(id: string, userId: string) {
    return await this.prismaService.profiles.findUnique({
      where: {
        user_id: userId,
        id,
      },
    });
  }

  async update(id: string, updateProfileDto: UpdateProfileDto, userId: string) {
    const { name, notes, currency, locale, monthly_email_report } =
      updateProfileDto;
    return await this.prismaService.profiles.update({
      where: {
        user_id: userId,
        id,
      },
      data: {
        name,
        notes,
        currency,
        locale,
        monthly_email_report,
      },
    });
  }

  async remove(id: string, userId: string) {
    return this.prismaService.profiles.delete({
      where: {
        user_id: userId,
        id,
      },
    });
  }
}
