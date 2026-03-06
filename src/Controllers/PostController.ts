import "reflect-metadata";
import { Controller, Get, Post, Put, Delete, Route, Tags, Body, Path } from "tsoa";
import { injectable, inject } from "tsyringe";
import { PostService } from "@askorg/core";
import type { Post as PostType, CreatePostDto, UpdatePostDto } from "@askorg/shared";

@injectable()
@Route("posts")
@Tags("Posts")
export class PostController extends Controller {
  constructor(
    @inject(PostService) private postService: PostService
  ) {
    super();
  }

  @Get("/")
  async getAll(): Promise<PostType[]> {
    return this.postService.getAll();
  }

  @Get("{id}")
  async getById(@Path() id: number): Promise<PostType> {
    return this.postService.getById(id);
  }

  @Get("slug/{slug}")
  async getBySlug(@Path() slug: string): Promise<PostType> {
    return this.postService.getBySlug(slug);
  }

  @Post("/")
  async create(@Body() body: CreatePostDto): Promise<PostType> {
    return this.postService.create(body);
  }

  @Put("{id}")
  async update(@Path() id: number, @Body() body: UpdatePostDto): Promise<PostType> {
    return this.postService.update(id, body);
  }

  @Delete("{id}")
  async delete(@Path() id: number): Promise<PostType> {
    return this.postService.delete(id);
  }
}