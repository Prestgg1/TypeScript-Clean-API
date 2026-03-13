import "reflect-metadata";
import { singleton, inject } from "tsyringe";
import { InternalServerError, NotFoundError } from "@askorg/shared/Exceptions";
import { MaterialRepository } from "@askorg/database/repositories";
import type {  Material, Post, UploadedFile } from "@askorg/shared/DTOs";
import { cloudinary } from "../config/cloudinary";
import { file } from "bun";

@singleton()
export class MaterialService {
    constructor(
        @inject(MaterialRepository) private materialRepo: MaterialRepository
    ) { }

    async getAll() {
        return this.materialRepo.findAll();
    }

    async getById(id: number) {
        const item = await this.materialRepo.findById(id);
        if (!item) throw new NotFoundError("Material not found");
        return item;
    }


  async create(file: UploadedFile): Promise<Material> {
  const uploaded = await new Promise<{ url: string }>((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { folder: "askorg/materials", resource_type: "raw" },
      (error, result) => {
        if (error || !result) return reject(error);
        resolve({ url: result.secure_url });
      }
    ).end(file.buffer);
  });

  return this.materialRepo.create(uploaded.url);
}

    async delete(id: number) {
        const item = await this.materialRepo.findById(id);
        if (!item) throw new NotFoundError("Material not found");

        await cloudinary.uploader.destroy(item.pdf);
        return this.materialRepo.delete(id);
    }
}