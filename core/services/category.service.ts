// core/src/services/category.service.ts
import "reflect-metadata";
import { singleton, inject } from "tsyringe";
import { ConflictError } from "@askorg/shared/Exceptions";
import { CategoryRepository } from "@askorg/database/repositories";
import type { Category, CreateCategoryDto, UpdateCategoryDto } from "@askorg/shared/DTOs";

@singleton()
export class CategoryService {
  constructor(
    @inject(CategoryRepository) private categoryRepo: CategoryRepository
  ) {}

  async getAll() {
    return this.categoryRepo.findAll();
  }

  async getById(id: number) {
    const category = await this.categoryRepo.findById(id);
    if (!category) throw new Error("Category not found");
    return category;
  }

  async create(dto: CreateCategoryDto): Promise<Category> {
   const existing = await this.categoryRepo.findBySlug(dto.slug);
  
  if (existing) {
    throw new ConflictError("Bu slug artıq istifadə edilib"); 
  }
  return this.categoryRepo.create(dto);
  }

  async update(id: number, dto: UpdateCategoryDto) {
    const category = await this.categoryRepo.update(id, dto);
    if (!category) throw new Error("Category not found");
    return category;
  }

  async delete(id: number) {
    const category = await this.categoryRepo.delete(id);
    if (!category) throw new Error("Category not found");
    return category;
  }
}