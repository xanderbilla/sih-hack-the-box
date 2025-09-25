// Authentication related types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  username: string;
  name: string;
}

export interface AuthResponse {
  message: string;
  user?: {
    id: string;
    email: string;
    username: string;
    name: string;
  };
  token?: string;
}

export interface User {
  _id: string;
  email: string;
  username: string;
  Name: string;
  avatarUrl: string;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface UserProfileResponse {
  user: User;
}
