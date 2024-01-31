import { IsString, IsUUID, IsCurrency } from 'class-validator';

export class CreateIncomeDto {
  @IsUUID()
  profile_id: string;

  @IsString()
  name: string;

  @IsString()
  @IsCurrency()
  amount: string;
}
