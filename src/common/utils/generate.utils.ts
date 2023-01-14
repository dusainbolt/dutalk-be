export class Generate {
  static otp = () => Math.floor(100000 + Math.random() * 900000);

  static keyRegister = (accountId: number, username) => `otp_register_${accountId}_${username}`;

  static keyForgotPassword = (accountId: number, username) => `otp_forgot_pw_${accountId}_${username}`;
}
