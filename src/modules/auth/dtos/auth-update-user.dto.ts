import { IsEmail } from 'class-validator';

export class AuthUpdateUserDto {
  @IsEmail()
  email: string;

  attributes: object;
}
