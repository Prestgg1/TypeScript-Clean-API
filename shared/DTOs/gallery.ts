import type { Post } from "./post";

export interface Gallery {
    id: number;
    postId: number;
    url: string;
    publicId: string;
    createdAt: Date;
    post?: Post;
}

export interface CreateGalleryDto {
    postId: number;
    url: string;
    publicId: string;
}
export interface UploadedFile {
    buffer: Buffer;
    mimetype: string;
    originalname: string;
}