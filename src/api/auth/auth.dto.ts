import { Transform } from 'class-transformer';
import { IsEmail, IsEthereumAddress } from 'class-validator';
import { IsSwaggerString } from 'src/common/decorators';

export class AuthSignUpByWalletDto {
  @IsSwaggerString({ default: '0x94296e02b0e9005f53978D108184984831E1B9F' })
  @IsEthereumAddress()
  address: string;

  @IsSwaggerString({ default: '0x378c85d60d35ddf93...eef0ce36b916166ddefb75' })
  signature: string;
}

export class AuthSignUpDto {
  @IsSwaggerString({ default: 'example@gmail.com' })
  @IsEmail()
  email: string;

  @IsSwaggerString({ default: 'username' })
  username: string;

  @IsSwaggerString({ default: 'password' })
  password: string;
}
