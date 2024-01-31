import { Injectable } from '@nestjs/common';
import { CreateSubscriptionDto } from './dtos/create-subscription.dto';
import { UpdateSubscriptionDto } from './dtos/update-subscription.dto';
import { PrismaService } from '../../config/db/prisma/prisma.service';
import { validateProfile } from 'src/common/utils/profile-utils';

@Injectable()
export class SubscriptionsService {
  constructor(private prismaService: PrismaService) {}

  async create(
    createSubscriptionDto: CreateSubscriptionDto,
    profiles: string[],
  ) {
    validateProfile(profiles, createSubscriptionDto.profile_id);
    return await this.prismaService.subscriptions.create({
      data: createSubscriptionDto,
    });
  }

  async findAll(profileId: string, profiles: string[]) {
    validateProfile(profiles, profileId);
    return await this.prismaService.subscriptions.findMany({
      where: {
        profile_id: profileId,
      },
    });
  }

  async findOne(id: string, profileId: string, profiles: string[]) {
    validateProfile(profiles, profileId);
    return await this.prismaService.subscriptions.findUnique({
      where: {
        profile_id: profileId,
        id,
      },
    });
  }

  async update(
    id: string,
    updateSubscriptionDto: UpdateSubscriptionDto,
    profiles: string[],
  ) {
    const {
      name,
      amount,
      category_id,
      profile_id,
      notes,
      url,
      notify,
      start_date,
      end_date,
      cancelled_at,
      active,
      paid,
    } = updateSubscriptionDto;
    validateProfile(profiles, profile_id);
    return await this.prismaService.subscriptions.update({
      where: {
        profile_id,
        id,
      },
      data: {
        name,
        amount,
        notes,
        category_id,
        url,
        notify,
        start_date,
        end_date,
        cancelled_at,
        active,
        paid,
      },
    });
  }

  async remove(id: string, profileId: string, profiles: string[]) {
    validateProfile(profiles, profileId);
    return this.prismaService.subscriptions.delete({
      where: {
        profile_id: profileId,
        id,
      },
    });
  }
}
