import { Injectable } from '@nestjs/common';
import { CreateIncomeDto } from './dtos/create-income.dto';
import { UpdateIncomeDto } from './dtos/update-income.dto';
import { PrismaService } from '../../config/db/prisma/prisma.service';
import { validateProfile } from 'src/common/utils/profile-utils';
import { PaginationParams } from 'src/types';
import { getPaginationQuery } from 'src/helpers/pagination';

@Injectable()
export class IncomesService {
  constructor(private prismaService: PrismaService) {}

  async create(createIncomeDto: CreateIncomeDto, profiles: string[]) {
    validateProfile(profiles, createIncomeDto.profile_id);
    return await this.prismaService.incomes.create({
      data: createIncomeDto,
    });
  }

  async findAll(
    profileId: string,
    profiles: string[],
    paginationParams: PaginationParams,
  ) {
    validateProfile(profiles, profileId);
    const filters = { profile_id: profileId };
    const pagination = getPaginationQuery(paginationParams);
    return await this.prismaService.$transaction([
      this.prismaService.incomes.count({ where: filters }),
      this.prismaService.incomes.findMany({
        where: filters,
        ...(pagination && { ...pagination }),
      }),
    ]);
  }

  async findOne(id: string, profileId: string, profiles: string[]) {
    validateProfile(profiles, profileId);
    return await this.prismaService.incomes.findUnique({
      where: {
        profile_id: profileId,
        id,
      },
    });
  }

  async update(
    id: string,
    updateIncomeDto: UpdateIncomeDto,
    profiles: string[],
  ) {
    const { name, amount, category_id, profile_id, notes } = updateIncomeDto;
    validateProfile(profiles, profile_id);
    return await this.prismaService.incomes.update({
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
    return this.prismaService.incomes.delete({
      where: {
        profile_id: profileId,
        id,
      },
    });
  }
}
