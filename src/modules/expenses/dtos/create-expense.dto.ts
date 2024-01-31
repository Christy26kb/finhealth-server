import { IsString, IsUUID, IsCurrency } from 'class-validator';

export class CreateExpenseDto {
  @IsUUID()
  profile_id: string;

  @IsString()
  name: string;

  @IsString()
  @IsCurrency()
  amount: string;

  @IsString()
  notes?: string;

  @IsString()
  paid_via?: string;
}
