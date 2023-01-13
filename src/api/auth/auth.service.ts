import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Account } from 'src/entities/account.entity';
// import { AuthSignUpByWalletDto, AuthSignUpDto } from 'src/validation/auth.dto';
@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  generateAuthToken(user: Account): any {
    // const userJWTInfo: UserJwtInfo = {
    //   address: user.address,
    //   _id: user.email,
    //   username: user.username,
    //   email: user.email,
    //   role: user.role,
    //   status: user.status,
    // };
    // return this.jwtService.sign(userJWTInfo);
  }

  async signUpByWallet(body: any) {
    // const { address, signature } = body;
    // if (!(await Web3.verifySignature(address, signature, config.web3.messageSignatureLogin))) {
    //   throw new AppException(ERROR_CODE.AUTH_INVALID_SIGNATURE);
    // }
    // let user = await this.userService.findOne({ address });
    // if (!user) {
    //   user = await this.userService.create({ address });
    // }
    // return { token: this.generateAuthToken(user), email: user.email || null };
  }

  async signUp(body: any) {
    // const { email, username } = body;
    // await this.userService.checkExistEmailOrUsername(body.email, body.username, null);
    // const password = await Security.hashBcrypt(body.password);
    // const user = await this.userService.create({ email, username, password });
    // return { token: this.generateAuthToken(user), address: user.address || null };
  }
}
