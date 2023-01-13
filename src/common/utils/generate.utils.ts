export class Generate {
  static otp = () => Math.floor(100000 + Math.random() * 900000);

  static keyOtp = (accountId: number, username) => `otp_register_${accountId}_${username}`;
}
