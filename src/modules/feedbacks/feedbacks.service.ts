import { Injectable } from '@nestjs/common';
import { CreateFeedbackDto } from './dtos/create-feedback.dto';
import { UpdateFeedbackDto } from './dtos/update-feedback.dto';
import { PrismaService } from '../../config/db/prisma/prisma.service';

@Injectable()
export class FeedbacksService {
  constructor(private prismaService: PrismaService) {}

  async create(createFeedbackDto: CreateFeedbackDto, userId: string) {
    return await this.prismaService.feedbacks.create({
      data: { ...createFeedbackDto, user_id: userId },
    });
  }

  async findAll(userId: string) {
    return await this.prismaService.feedbacks.findMany({
      where: {
        user_id: userId,
      },
    });
  }

  async findOne(id: number, userId: string) {
    return await this.prismaService.feedbacks.findUnique({
      where: {
        user_id: userId,
        id,
      },
    });
  }

  async update(
    id: number,
    updateFeedbackDto: UpdateFeedbackDto,
    userId: string,
  ) {
    const { message } = updateFeedbackDto;
    return await this.prismaService.feedbacks.update({
      where: {
        user_id: userId,
        id,
      },
      data: {
        message,
      },
    });
  }

  async remove(id: number, userId: string) {
    return this.prismaService.feedbacks.delete({
      where: {
        user_id: userId,
        id,
      },
    });
  }
}
