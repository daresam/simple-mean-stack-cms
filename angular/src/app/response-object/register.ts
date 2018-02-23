import { User } from './user';
export interface RegisterResponse {
  success: boolean;
  message: string;
  user: User;
}
