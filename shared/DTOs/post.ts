import type { Category } from "./category";

export interface Post {
  id: number;
  title: string;
  content: string;
  slug: string;
  imageUrl: string;
  categoryId: number;
  category?: Category;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreatePostDto {
  title: string;
  content: string;
  imageUrl: string;
  categoryId: number;
}

export interface PostQueryDto {
  category?: string;
  limit?: number;
  page?: number;
  search?: string;
  offset?: number;
}

export interface UpdatePostDto {
  title?: string;
  content?: string;
  slug?: string;
  imageUrl?: string;
  categoryId?: number;
}
