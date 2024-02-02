import {
  IsString,
  IsUUID,
  IsCurrency,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class CreateInvestmentDto {
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
  units: string;

  @IsNumber()
  @IsOptional()
  category_id?: number | null;
}
