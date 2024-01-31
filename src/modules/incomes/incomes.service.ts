import { Injectable } from '@nestjs/common';
import { CreateIncomeDto } from './dtos/create-income.dto';
import { UpdateIncomeDto } from './dtos/update-income.dto';
import { PrismaService } from '../../config/db/prisma/prisma.service';
import { validateProfile } from 'src/common/utils/profile-utils';

@Injectable()
export class IncomesService {
  constructor(private prismaService: PrismaService) {}

  async create(createIncomeDto: CreateIncomeDto, profiles: string[]) {
    validateProfile(profiles, createIncomeDto.profile_id);
    return await this.prismaService.incomes.create({
      data: createIncomeDto,
    });
  }

  async findAll(profileId: string, profiles: string[]) {
    validateProfile(profiles, profileId);
    return await this.prismaService.incomes.findMany({
      where: {
        profile_id: profileId,
      },
    });
  }

  async findOne(id: string, profileId: string, profiles: string[]) {
    validateProfile(profiles, profileId);
    return await this.prismaService.incomes.findUnique({
      where: {
        profile_id: profileId,
        id: id,
      },
    });
  }

  async update(
    id: string,
    updateIncomeDto: UpdateIncomeDto,
    profiles: string[],
  ) {
    const { name, amount, category_id, profile_id } = updateIncomeDto;
    validateProfile(profiles, profile_id);
    return await this.prismaService.incomes.update({
      where: {
        profile_id,
        id,
      },
      data: {
        name,
        amount,
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
