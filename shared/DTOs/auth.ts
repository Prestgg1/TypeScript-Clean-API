// shared/src/dto/auth.dto.ts
export interface LoginDto {
  email: string;
  password: string;
}

export interface AuthTokensDto {
  accessToken: string;
  refreshToken: string;
}
export interface User {
  id: number;
  email: string;
  password: string;
  refresh_token: string | null;
  createdAt: Date;
  updatedAt: Date;
}