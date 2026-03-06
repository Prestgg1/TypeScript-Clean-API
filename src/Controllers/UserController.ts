import "reflect-metadata";
import { Controller, Get, Post, Route, Tags, Body, Path } from "tsoa";
import { injectable, inject } from "tsyringe";
import { UsersService } from "@askorg/core";
import type { User, UserCreationParams } from "@askorg/shared";

@injectable()
@Route("users")
@Tags("Users")
export class UsersController extends Controller {
  constructor(
    @inject(UsersService) private usersService: UsersService
  ) {
    super();
  }

  @Get("{userId}")
  async getUser(@Path() userId: number): Promise<User> {
    return this.usersService.get(userId);
  }

  @Post()
  async createUser(@Body() requestBody: UserCreationParams): Promise<User> {
    return this.usersService.create(requestBody);
  }
}