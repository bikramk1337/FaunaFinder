export interface IUser {
  email: string;
  is_active: boolean;
  email_verified: boolean;
  user_type: string;
  full_name: string;
  id: number;
}

export interface IUsersResponse {
  data: IUser[];
  count: string;
}

export interface IUserCreate extends IUser {
  password: string;
}
