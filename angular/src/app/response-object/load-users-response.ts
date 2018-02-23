import { User } from './user';

export interface LoadUsersResponse {
  success: boolean;
  message:  string;
  user: User[];
}
