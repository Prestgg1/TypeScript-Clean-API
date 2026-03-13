import "reflect-metadata";
import { Controller, Get, Post, Put, Delete, Route, Tags, Body, Path, UploadedFile, FormField } from "tsoa";
import { injectable, inject } from "tsyringe";
import type { Post as PostType, UpdatePostDto, PaginatedResult } from "@askorg/shared/DTOs";
import { Query } from "tsoa";
import { PostService } from "@askorg/core/services";
@injectable()
@Route("posts")
@Tags("Posts")
export class PostController extends Controller {
  constructor(
    @inject(PostService) private postService: PostService
  ) {
    super();
  }
  /**
  * Bütün postları və ya seçilmiş kateqoriyaya aid postları gətirir.
  * @param category Kateqoriya slug-ı (məs: 'elanlar')
  */
  @Get("/")
  async getAll(@Query() category?: string,
    @Query() limit?: number,
    @Query() search?: string,
    @Query() offset?: number,
    @Query() sort?: boolean,
  ): Promise<PaginatedResult<PostType>> {
    return this.postService.getAll({ category, limit, search, offset, sort });
  }

  @Get("/{slug}")
  async getBySlug(@Path() slug: string): Promise<PostType> {
    return this.postService.getBySlug(slug);
  }

  @Post("/")
  async create(@FormField() title: string,
    @FormField() content: string,
    @FormField() categoryId: string,
    @UploadedFile("image") image: Express.Multer.File,) {
    console.log("image", image)
    await this.postService.create(
      { title, content, categoryId: parseInt(categoryId, 10) },
      { buffer: image.buffer, mimetype: image.mimetype, originalname: image.originalname }
    );
    return { data: "true" };
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
