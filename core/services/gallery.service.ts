import "reflect-metadata";
import { singleton, inject } from "tsyringe";
import { NotFoundError } from "@askorg/shared/Exceptions";
import { GalleryRepository } from "@askorg/database/repositories";
import type { Post } from "@askorg/shared/DTOs";
import { cloudinary } from "../config/cloudinary";

@singleton()
export class GalleryService {
    constructor(
        @inject(GalleryRepository) private galleryRepo: GalleryRepository
    ) { }

    async getAll() {
        return this.galleryRepo.findAll();
    }

    async getById(id: number) {
        const item = await this.galleryRepo.findById(id);
        if (!item) throw new NotFoundError("Gallery item not found");
        return item;
    }

    async getByPostId(postId: number) {
        const items = await this.galleryRepo.findByPostId(postId);
        if (!items.length) throw new NotFoundError("No gallery items found for this post");
        return items;
    }

    async addFromPost(post: Post) {
        if (!post.imageUrl) return;

        const uploaded = await cloudinary.uploader.upload(post.imageUrl, {
            folder: "askorg/gallery",
        });

        return this.galleryRepo.create({
            postId: post.id,
            url: uploaded.secure_url,
            publicId: uploaded.public_id,
        });
    }

    async delete(id: number) {
        const item = await this.galleryRepo.findById(id);
        if (!item) throw new NotFoundError("Gallery item not found");

        await cloudinary.uploader.destroy(item.publicId);
        return this.galleryRepo.delete(id);
    }
}