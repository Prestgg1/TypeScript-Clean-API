// core/src/listeners/gallery.listener.ts
import { eventBus, Events } from "@askorg/shared/Events";
import { GalleryService } from "../services/gallery.service";

export function registerListeners(galleryService: GalleryService) {
    eventBus.on(Events.POST_CREATED, async (post) => {
        if (!post.coverImage) return;
        await galleryService.addFromPost(post);
    });
}