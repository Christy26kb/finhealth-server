import { IsString, IsUUID } from 'class-validator';

export class CreateProfileDto {
  @IsUUID()
  user_id: string;

  @IsString()
  name: string;
}
