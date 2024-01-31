import {
  IsString,
  IsUUID,
  IsCurrency,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class CreateLendDto {
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
