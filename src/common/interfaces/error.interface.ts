import { HttpStatus } from '@nestjs/common';

export interface AppError {
  code: string;
  message: string;
  status: HttpStatus;
}

export enum ERROR_CODE {
  // TEST
  ERROR_CODE_TEST = 'ERROR_CODE_TEST',

  // AUTH
  AUTH_UNAUTHORIZED_ACCESS_TOKEN = 'AUTH_UNAUTHORIZED_ACCESS_TOKEN',
  AUTH_TOKEN_CLAIMS_BEFORE = 'AUTH_TOKEN_CLAIMS_BEFORE',
  AUTH_TOKEN_EXPIRED = 'AUTH_TOKEN_EXPIRED',
  AUTH_TOKEN_INVALID = 'AUTH_TOKEN_INVALID',
  AUTH_PASSWORD_INCORRECT = 'AUTH_PASSWORD_INCORRECT',

  // ACCOUNT
  ACCOUNT_NOT_ACTIVE = 'ACCOUNT_NOT_ACTIVE',
  ACCOUNT_USERNAME_EMAIL_ALREADY_REGISTER = 'ACCOUNT_USERNAME_EMAIL_ALREADY_REGISTER',

  // ACCOUNT_PASSWORD_FORMAT_INVALID = 'ACCOUNT_PASSWORD_FORMAT_INVALID',
  // ACCOUNT_EMAIL_ALREADY_REGISTER = 'ACCOUNT_EMAIL_ALREADY_REGISTER',
}
