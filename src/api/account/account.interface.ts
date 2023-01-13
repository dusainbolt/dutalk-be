export enum AccountStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export enum AccountRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export type AccountJWT = {
  id: number;
  username: string;
  email: string;
  role: AccountRole;
  status: AccountStatus;
};
