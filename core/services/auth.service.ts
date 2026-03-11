// core/src/services/auth.service.ts
import "reflect-metadata";
import { singleton, inject } from "tsyringe";
import { UnauthorizedError, NotFoundError } from "@askorg/shared/Exceptions";
import { UserRepository } from "@askorg/database/repositories";
import type { AuthTokensDto, LoginDto } from "@askorg/shared/DTOs";
/* import * as bcrypt from "bcrypt"; */
import * as jwt from "jsonwebtoken"; 

@singleton()
export class AuthService {
  constructor(
    @inject(UserRepository) private userRepo: UserRepository
  ) {}

  async login(dto: LoginDto): Promise<AuthTokensDto> {
    const user = await this.userRepo.findByEmail(dto.email);
    if (!user) {
      throw new NotFoundError("İstifadəçi tapılmadı");
    }

    /* const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedError("Email və ya şifrə yanlışdır");
    } */

    const accessToken = this.generateAccessToken(user.id, user.email);
    const refreshToken = this.generateRefreshToken(user.id, user.email);

  /*   const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.userRepo.updateRefreshToken(user.id, hashedRefreshToken);
 */
    return { accessToken, refreshToken };
  }

  async refreshTokens(userId: number, refreshToken: string): Promise<AuthTokensDto> {
    const user = await this.userRepo.findById(userId);
    if (!user || !user.refresh_token) {
      throw new UnauthorizedError("Giriş rədd edildi");
    }

   /*  const isRefreshTokenValid = await bcrypt.compare(refreshToken, user.refresh_token);
    if (!isRefreshTokenValid) {
      throw new UnauthorizedError("Refresh token yanlışdır");
    } */

    const newAccessToken = this.generateAccessToken(user.id, user.email);
    const newRefreshToken = this.generateRefreshToken(user.id, user.email);
/* 
    const hashedRefreshToken = await bcrypt.hash(newRefreshToken, 10); */
  /*   await this.userRepo.updateRefreshToken(user.id, hashedRefreshToken);
 */
    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  }

  async logout(userId: number): Promise<void> {
    const user = await this.userRepo.findById(userId);
    if (!user) {
      throw new NotFoundError("İstifadəçi tapılmadı");
    }

    await this.userRepo.updateRefreshToken(user.id, "");
  }

  private generateAccessToken(userId: number, email: string): string {
    return jwt.sign(
      { sub: userId, email },
      process.env.JWT_ACCESS_SECRET!,
      { expiresIn: "15m" }
    );
  }

  private generateRefreshToken(userId: number, email: string): string {
    return jwt.sign(
      { sub: userId, email },
      process.env.JWT_REFRESH_SECRET!,
      { expiresIn: "7d" }
    );
  }
}