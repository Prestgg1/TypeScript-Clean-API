import { NotFoundError } from "@askorg/shared/Exceptions";
import type { CreatePostDto, PaginatedResult, PostQueryDto, UpdatePostDto } from "@askorg/shared/DTOs";
import { PostRepository } from "@askorg/database/repositories/post.repository";
import { singleton, inject } from "tsyringe";
import slugify from "slugify";
@singleton()
export class PostService {
  constructor(
    @inject(PostRepository) private postRepo: PostRepository
  ) { }

  async getAll(query: PostQueryDto = {}): Promise<PaginatedResult<any>> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    const offset = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.postRepo.findAll({ ...query, limit, offset }),
      this.postRepo.count(query),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    };
  }

  async getById(id: number) {
    const post = await this.postRepo.findById(id);
    if (!post) throw new NotFoundError("Post not found");
    return post;
  }

  async getBySlug(slug: string) {
    const post = await this.postRepo.findBySlug(slug);
    if (!post) throw new NotFoundError("Post not found");
    return post;
  }

  async create(dto: CreatePostDto) {

    const slug = slugify(dto.title, {
      lower: true,
      strict: true,
    });
    const existing = await this.postRepo.findBySlug(slug);
    if (existing) throw new NotFoundError("Slug already exists");
    return this.postRepo.create(dto, slug);
  }

  async update(id: number, dto: UpdatePostDto) {
    const post = await this.postRepo.update(id, dto);
    if (!post) throw new NotFoundError("Post not found");
    return post;
  }

  async delete(id: number) {
    const post = await this.postRepo.delete(id);
    if (!post) throw new NotFoundError("Post not found");
    return post;
  }
}
