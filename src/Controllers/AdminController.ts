import "reflect-metadata";
import { Controller, Get, Post, Route, Tags, Body, Path } from "tsoa";
import { injectable, inject } from "tsyringe";
import { AuthService } from "@askorg/core/services/auth.service";
import type { AuthTokensDto, LoginDto } from "@askorg/shared/DTOs";

@injectable()
@Route("admin")
@Tags("Admin")
export class AdminController extends Controller {
  constructor(
    @inject(AuthService) private usersService: AuthService

  ) {
    super();
  }
  @Post("/login")
  async login(@Body() body: LoginDto): Promise<AuthTokensDto> {
    return this.usersService.login(body);
  }

  @Post("/refresh")
  async refreshTokens(@Body() body: { userId: number; refreshToken: string }): Promise<AuthTokensDto> {
    return this.usersService.refreshTokens(body.userId, body.refreshToken);
  }

  @Post("/logout")
  async logout(@Body() body: { userId: number }): Promise<void> {
    await this.usersService.logout(body.userId);
    return;
  }
  
}