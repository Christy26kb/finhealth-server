import { Injectable } from '@nestjs/common';
import { CreateLendDto } from './dtos/create-lend.dto';
import { UpdateLendDto } from './dtos/update-lend.dto';
import { PrismaService } from '../../config/db/prisma/prisma.service';
import { validateProfile } from 'src/common/utils/profile-utils';

@Injectable()
export class LendsService {
  constructor(private prismaService: PrismaService) {}

  async create(createLendDto: CreateLendDto, profiles: string[]) {
    validateProfile(profiles, createLendDto.profile_id);
    return await this.prismaService.lends.create({
      data: createLendDto,
    });
  }

  async findAll(profileId: string, profiles: string[]) {
    validateProfile(profiles, profileId);
    return await this.prismaService.lends.findMany({
      where: {
        profile_id: profileId,
      },
    });
  }

  async findOne(id: string, profileId: string, profiles: string[]) {
    validateProfile(profiles, profileId);
    return await this.prismaService.lends.findUnique({
      where: {
        profile_id: profileId,
        id,
      },
    });
  }

  async update(id: string, updateLendDto: UpdateLendDto, profiles: string[]) {
    const { name, amount, category_id, profile_id, notes } = updateLendDto;
    validateProfile(profiles, profile_id);
    return await this.prismaService.lends.update({
      where: {
        profile_id,
        id,
      },
      data: {
        name,
        amount,
        notes,
        category_id,
      },
    });
  }

  async remove(id: string, profileId: string, profiles: string[]) {
    validateProfile(profiles, profileId);
    return this.prismaService.lends.delete({
      where: {
        profile_id: profileId,
        id,
      },
    });
  }
}
