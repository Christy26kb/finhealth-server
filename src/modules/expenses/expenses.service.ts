import { Injectable } from '@nestjs/common';
import { CreateExpenseDto } from './dtos/create-expense.dto';
import { UpdateExpenseDto } from './dtos/update-expense.dto';
import { PrismaService } from '../../config/db/prisma/prisma.service';
import { validateProfile } from 'src/common/utils/profile-utils';

@Injectable()
export class ExpensesService {
  constructor(private prismaService: PrismaService) {}

  async create(createExpenseDto: CreateExpenseDto, profiles: string[]) {
    validateProfile(profiles, createExpenseDto.profile_id);
    return await this.prismaService.expenses.create({
      data: createExpenseDto,
    });
  }

  async findAll(profileId: string, profiles: string[]) {
    validateProfile(profiles, profileId);
    return await this.prismaService.expenses.findMany({
      where: {
        profile_id: profileId,
      },
    });
  }

  async findOne(id: string, profileId: string, profiles: string[]) {
    validateProfile(profiles, profileId);
    return await this.prismaService.expenses.findUnique({
      where: {
        profile_id: profileId,
        id,
      },
    });
  }

  async update(
    id: string,
    updateExpenseDto: UpdateExpenseDto,
    profiles: string[],
  ) {
    const { name, amount, category_id, profile_id, notes, paid_via } =
      updateExpenseDto;
    validateProfile(profiles, profile_id);
    return await this.prismaService.expenses.update({
      where: {
        profile_id,
        id,
      },
      data: {
        name,
        amount,
        notes,
        paid_via,
        category_id,
      },
    });
  }

  async remove(id: string, profileId: string, profiles: string[]) {
    validateProfile(profiles, profileId);
    return this.prismaService.expenses.delete({
      where: {
        profile_id: profileId,
        id,
      },
    });
  }
}
