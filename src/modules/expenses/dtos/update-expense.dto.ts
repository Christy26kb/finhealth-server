import {
  IsCurrency,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class UpdateExpenseDto {
  @IsUUID()
  profile_id: string;

  @IsString()
  name: string;

  @IsString()
  @IsCurrency()
  amount: string;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsString()
  paid_via?: string;

  @IsNumber()
  @IsOptional()
  category_id?: number | null;
}
