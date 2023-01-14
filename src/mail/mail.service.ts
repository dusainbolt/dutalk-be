import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Account } from 'src/entities/account.entity';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendOtpRegister(account: Account, otp: any) {
    try {
      // const url = `${this.config.get('DOMAIN_account')}/register/verify?q=${token}`;
      // const dataRedirect = `https://www.google.com/url?q=${url}&source=gmail&ust=${Date.now()}&usg=AOvVaw2rX-53uCkT68JRLD-X1qEE`;
      await this.mailerService.sendMail({
        to: account.email,
        // from: '"Support Team" <support@example.com>', // override default from
        subject: 'Xác nhận địa chỉ email',
        template: 'confirmation', // `.hbs` extension is appended automatically
        context: {
          // ✏️ filling curly brackets with content
          fullName: account.fullName,
          otp,
          // dataRedirect,
        },
      });
    } catch (e) {
      throw e;
    }
  }

  async sendOtpForgotPassword(account: Account, otp: any) {
    try {
      await this.mailerService.sendMail({
        to: account.email,
        subject: 'Yêu cầu thay đổi mật khẩu',
        template: 'forgot_password', // `.hbs` extension is appended automatically
        context: {
          fullName: account.fullName,
          otp,
        },
      });
    } catch (e) {
      throw e;
    }
  }
}
