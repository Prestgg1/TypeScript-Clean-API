import "reflect-metadata";
import { Controller, Get, Delete, Route, Tags, Path } from "tsoa";
import { injectable, inject } from "tsyringe";
import { GalleryService } from "@askorg/core/services";

@injectable()
@Route("gallery")
@Tags("Gallery")
export class GalleryController extends Controller {
  constructor(
    @inject(GalleryService) private galleryService: GalleryService
  ) {
    super();
  }

  @Get("/")
  async getAll() {
    return this.galleryService.getAll();
  }

  @Get("{id}")
  async getById(@Path() id: number) {
    return this.galleryService.getById(id);
  }

  @Get("post/{postId}")
  async getByPostId(@Path() postId: number) {
    return this.galleryService.getByPostId(postId);
  }

  @Delete("{id}")
  async delete(@Path() id: number) {
    return this.galleryService.delete(id);
  }
}