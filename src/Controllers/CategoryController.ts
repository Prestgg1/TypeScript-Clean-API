import "reflect-metadata";
import { Controller, Get, Post, Put, Delete, Route, Tags, Body, Path } from "tsoa";
import { injectable, inject } from "tsyringe";
import { CategoryService } from "@askorg/core";
import type { Category, CreateCategoryDto, UpdateCategoryDto } from "@askorg/shared";

@injectable()
@Route("categories")
@Tags("Categories")
export class CategoryController extends Controller {
  constructor(
    @inject(CategoryService) private categoryService: CategoryService
  ) {
    super();
  }

  @Get("/")
  async getAll(): Promise<Category[]> {
    return this.categoryService.getAll();
  }

  @Get("{id}")
  async getById(@Path() id: number): Promise<Category> {
    return this.categoryService.getById(id);
  }

  @Post("/")
  async create(@Body() body: CreateCategoryDto): Promise<Category> {
    return this.categoryService.create(body);
  }

  @Put("{id}")
  async update(@Path() id: number, @Body() body: UpdateCategoryDto): Promise<Category> {
    return this.categoryService.update(id, body);
  }

  @Delete("{id}")
  async delete(@Path() id: number): Promise<Category> {
    return this.categoryService.delete(id);
  }
}