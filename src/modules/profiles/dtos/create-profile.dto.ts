import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateProfileDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsString()
  currency: string;

  @IsString()
  locale: string;

  @IsBoolean()
  monthly_email_report: boolean;
}
