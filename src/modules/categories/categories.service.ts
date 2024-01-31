import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';
import { PrismaService } from '../../config/db/prisma/prisma.service';
import { validateProfile } from 'src/common/utils/profile-utils';

@Injectable()
export class CategoriesService {
  constructor(private prismaService: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto, profiles: string[]) {
    validateProfile(profiles, createCategoryDto.profile_id);
    return await this.prismaService.categories.create({
      data: createCategoryDto,
    });
  }

  async findAll(profileId: string, profiles: string[]) {
    validateProfile(profiles, profileId);
    return await this.prismaService.categories.findMany({
      where: {
        profile_id: profileId,
      },
    });
  }

  async findOne(id: number, profileId: string, profiles: string[]) {
    validateProfile(profiles, profileId);
    return await this.prismaService.categories.findUnique({
      where: {
        profile_id: profileId,
        id,
      },
    });
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
    profiles: string[],
  ) {
    const { name, profile_id, notes, type } = updateCategoryDto;
    validateProfile(profiles, profile_id);
    return await this.prismaService.categories.update({
      where: {
        profile_id,
        id,
      },
      data: {
        name,
        notes,
        type,
      },
    });
  }

  async remove(id: number, profileId: string, profiles: string[]) {
    validateProfile(profiles, profileId);
    return this.prismaService.categories.delete({
      where: {
        profile_id: profileId,
        id,
      },
    });
  }
}
