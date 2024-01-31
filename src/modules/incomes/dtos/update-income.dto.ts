import {
  IsCurrency,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class UpdateIncomeDto {
  @IsUUID()
  profile_id: string;

  @IsString()
  name: string;

  @IsString()
  @IsCurrency()
  amount: string;

  @IsNumber()
  @IsOptional()
  category_id?: number | null;
}
