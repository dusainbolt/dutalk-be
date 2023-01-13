export interface IConfig {
  env: Env;
  jwt: IConfigJwt;
  server: IConfigServer;
  database: IConfigDatabase;
  web3: IConfigWeb3;
}

export enum Env {
  DEFAULT = 'default',
  DEVELOPMENT = 'development',
  STAGING = 'staging',
  PRODUCTION = 'production',
}

export interface IConfigWeb3 {
  providerUrl: string;
  privateKeyAdmin: string;
  publicKeyAdmin: string;
  soulBoundAddress: string;
}

export interface IConfigJwt {
  secretKey: string;
  expireIns: string;
}

export interface IConfigServer {
  host: string;
  port: number;
  version: string;
}

export interface IConfigDatabase {
  type: 'postgres';
  username: string;
  password: string;
  database: string;
  synchronize: boolean;
  host: string;
  port: number;
}

export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
  FATAL = 'fatal',
}
