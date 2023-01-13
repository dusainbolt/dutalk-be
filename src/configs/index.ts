import { Env, IConfig } from 'src/common/interfaces/config.interface';

/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();

// export * as database from './database';

const config: IConfig = {
  env: (process.env.NODE_ENV as Env) || Env.DEFAULT,

  server: {
    host: process.env.SERVER_HOST,
    port: parseInt(process.env.SERVER_PORT) || 8002,
    version: process.env.SERVER_VERSION || 'v1',
  },
  database: {
    type: 'postgres',
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT ? +process.env.POSTGRES_PORT : 3306,
    synchronize: true,
  },
  jwt: {
    secretKey: process.env.JWT_SECRET_KEY,
    expireIns: process.env.JWT_EXPIRATION_TIME,
  },

  web3: {
    providerUrl: process.env.WEB3_PROVIDER_URL,
    privateKeyAdmin: process.env.WEB3_PRIVATE_KEY_ADMIN,
    publicKeyAdmin: process.env.WEB3_PUBLIC_KEY_ADMIN,
    soulBoundAddress: process.env.WEB3_SOUL_BOUND_ADDRESS,
  },
};

export const configuration = (): IConfig => config;
export default config;
console.log('🚀 ~ file: index.ts ~ process.env.NODE_ENV', process.env.NODE_ENV);
console.log('🚀 ~ file: index.ts ~ config', config);
