import {
  IsString,
  IsUUID,
  IsCurrency,
  IsNumber,
  IsOptional,
  IsBoolean,
  IsDateString,
} from 'class-validator';

export class CreateSubscriptionDto {
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
  paid: string;

  @IsString()
  @IsOptional()
  url?: string;

  @IsBoolean()
  notify: boolean;

  @IsDateString()
  start_date: string;

  @IsDateString()
  end_date: string;

  @IsBoolean()
  @IsOptional()
  active?: boolean;

  @IsString()
  @IsOptional()
  cancelled_at?: string;

  @IsNumber()
  @IsOptional()
  category_id?: number | null;
}
