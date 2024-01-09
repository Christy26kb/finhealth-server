import { IsEmail, IsString } from 'class-validator';

export class AuthVerifyUserDto {
  @IsString()
  code: string;

  @IsEmail()
  email: string;
}
