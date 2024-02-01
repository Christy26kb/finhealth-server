import { IsString, IsUUID, IsCurrency, IsOptional } from 'class-validator';

export class CreateExpenseDto {
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
}
