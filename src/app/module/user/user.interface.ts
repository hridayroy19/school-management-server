
export type UserRole = 'ADMIN' | 'TRAINER' | 'TRAINEE';

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  userStatus:string
  profilePhoto:string
  createdAt: Date;
  updatedAt: Date;
}
