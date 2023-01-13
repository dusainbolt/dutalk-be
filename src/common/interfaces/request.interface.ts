import { Request } from 'express';
export interface IRequestResponse<T> {
  status: '1' | '0';
  message: 'OK';
  result: T;
}

export type RequestUser = Request;
