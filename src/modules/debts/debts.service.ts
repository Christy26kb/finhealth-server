import { Injectable } from '@nestjs/common';
import { CreateDebtDto } from './dtos/create-debt.dto';
import { UpdateDebtDto } from './dtos/update-debt.dto';
import { PrismaService } from '../../config/db/prisma/prisma.service';
import { validateProfile } from 'src/common/utils/profile-utils';

@Injectable()
export class DebtsService {
  constructor(private prismaService: PrismaService) {}

  async create(createDebtDto: CreateDebtDto, profiles: string[]) {
    validateProfile(profiles, createDebtDto.profile_id);
    return await this.prismaService.debts.create({
      data: createDebtDto,
    });
  }

  async findAll(profileId: string, profiles: string[]) {
    validateProfile(profiles, profileId);
    return await this.prismaService.debts.findMany({
      where: {
        profile_id: profileId,
      },
    });
  }

  async findOne(id: string, profileId: string, profiles: string[]) {
    validateProfile(profiles, profileId);
    return await this.prismaService.debts.findUnique({
      where: {
        profile_id: profileId,
        id,
      },
    });
  }

  async update(id: string, updateDebtDto: UpdateDebtDto, profiles: string[]) {
    const { name, amount, category_id, profile_id, notes } = updateDebtDto;
    validateProfile(profiles, profile_id);
    return await this.prismaService.debts.update({
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
    return this.prismaService.debts.delete({
      where: {
        profile_id: profileId,
        id,
      },
    });
  }
}
