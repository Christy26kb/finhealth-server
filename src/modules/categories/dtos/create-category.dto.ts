import { CategoryTypes } from '@prisma/client';
import { IsString, IsUUID, IsOptional } from 'class-validator';

export class CreateCategoryDto {
  @IsUUID()
  profile_id: string;

  @IsString()
  name: string;

  @IsString()
  type: CategoryTypes;

  @IsString()
  @IsOptional()
  notes?: string;
}
