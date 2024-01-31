import {
  IsCurrency,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class UpdateDebtDto {
  @IsUUID()
  profile_id: string;

  @IsString()
  name: string;

  @IsString()
  @IsCurrency()
  amount: string;

  @IsString()
  notes?: string;

  @IsNumber()
  @IsOptional()
  category_id?: number | null;
}
