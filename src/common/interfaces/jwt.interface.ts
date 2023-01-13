import { Request } from 'express';

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export type RequestUser = Request;
