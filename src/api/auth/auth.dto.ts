import { IsEmail } from 'class-validator';
import { IsSwaggerString } from 'src/common/decorators';

export class AuthSignUpDto {
  @IsSwaggerString({ default: 'dulh181199@gmail.com' })
  @IsEmail()
  email: string;

  @IsSwaggerString({ default: 'dusainbolt' })
  username: string;

  @IsSwaggerString({ default: 'du@dev1234' })
  password: string;

  @IsSwaggerString({ default: 'Lê Huy Du' })
  fullName: string;
}
