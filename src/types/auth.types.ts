import type { User } from './user.types';

export interface LoginResponse {
  access_token: string;
  token_type: 'bearer';
  expires_in: number;
  user: User;
}
export interface LoginRequest {
  email: string;
  password: string;
}
