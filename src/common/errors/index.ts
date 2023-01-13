import { HttpStatus } from '@nestjs/common';
import { AppError, ERROR_CODE } from '../interfaces/error.interface';

export const ERROR: Record<ERROR_CODE, AppError> = {
  // COMMON
  [ERROR_CODE.ERROR_CODE_TEST]: {
    code: '0000',
    message: 'Error test',
    status: HttpStatus.OK,
  },

  //AUTH
  [ERROR_CODE.AUTH_TOKEN_CLAIMS_BEFORE]: {
    code: '0001',
    message: 'Your token has been claims before create',
    status: HttpStatus.UNAUTHORIZED,
  },
  [ERROR_CODE.AUTH_TOKEN_EXPIRED]: {
    code: '0002',
    message: 'Your token have been expired',
    status: HttpStatus.UNAUTHORIZED,
  },
  [ERROR_CODE.AUTH_TOKEN_INVALID]: {
    code: '0003',
    message: 'Your token is invalid',
    status: HttpStatus.UNAUTHORIZED,
  },
  [ERROR_CODE.AUTH_PASSWORD_INCORRECT]: {
    code: '0004',
    message: 'Your password is incorrectly',
    status: HttpStatus.OK,
  },
  [ERROR_CODE.AUTH_UNAUTHORIZED_ACCESS_TOKEN]: {
    code: '0005',
    message: 'Require token in cookie header',
    status: HttpStatus.UNAUTHORIZED,
  },

  // ACCOUNT 1xxx
  [ERROR_CODE.ACCOUNT_NOT_ACTIVE]: {
    code: '1000',
    message: 'User not active',
    status: HttpStatus.FORBIDDEN,
  },
  // [ERROR_CODE.ACCOUNT_PASSWORD_FORMAT_INVALID]: {
  //   code: '2000',
  //   message: 'Password should have 1 uppercase, 1 lowercase, 1 number and between 8 and 30 characters',
  //   status: HttpStatus.BAD_REQUEST,
  // },
  // [ERROR_CODE.ACCOUNT_EMAIL_ALREADY_REGISTER]: {
  //   code: '2001',
  //   message: 'The email is already registered',
  //   status: HttpStatus.BAD_REQUEST,
  // },
  // [ERROR_CODE.ACCOUNT_PHONE_NUMBER_ALREADY_REGISTER]: {
  //   code: '2002',
  //   message: 'The phone number is already registered',
  //   status: HttpStatus.BAD_REQUEST,
  // },
  // // WALLET 3xxx
  // [ERROR_CODE.WALLET_ADDRESS_ALREADY_REGISTER]: {
  //   code: '3000',
  //   message: 'The wallet address is already registered',
  //   status: HttpStatus.BAD_REQUEST,
  // },
};
