import { Injectable } from '@nestjs/common';
import { CreateInvestmentDto } from './dtos/create-investment.dto';
import { UpdateInvestmentDto } from './dtos/update-investment.dto';
import { PrismaService } from '../../config/db/prisma/prisma.service';
import { validateProfile } from 'src/common/utils/profile-utils';

@Injectable()
export class InvestmentsService {
  constructor(private prismaService: PrismaService) {}

  async create(createInvestmentDto: CreateInvestmentDto, profiles: string[]) {
    validateProfile(profiles, createInvestmentDto.profile_id);
    return await this.prismaService.investments.create({
      data: createInvestmentDto,
    });
  }

  async findAll(profileId: string, profiles: string[]) {
    validateProfile(profiles, profileId);
    return await this.prismaService.investments.findMany({
      where: {
        profile_id: profileId,
      },
    });
  }

  async findOne(id: string, profileId: string, profiles: string[]) {
    validateProfile(profiles, profileId);
    return await this.prismaService.investments.findUnique({
      where: {
        profile_id: profileId,
        id,
      },
    });
  }

  async update(
    id: string,
    updateInvestmentDto: UpdateInvestmentDto,
    profiles: string[],
  ) {
    const { name, amount, category_id, profile_id, notes, units } =
      updateInvestmentDto;
    validateProfile(profiles, profile_id);
    return await this.prismaService.investments.update({
      where: {
        profile_id,
        id,
      },
      data: {
        name,
        amount,
        notes,
        units,
        category_id,
      },
    });
  }

  async remove(id: string, profileId: string, profiles: string[]) {
    validateProfile(profiles, profileId);
    return this.prismaService.investments.delete({
      where: {
        profile_id: profileId,
        id,
      },
    });
  }
}
