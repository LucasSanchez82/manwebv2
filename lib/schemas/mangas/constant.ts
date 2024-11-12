export const isServer = typeof window === "undefined";
export const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3MB / 3MO
export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
  "image/svg",
  "image/webp",
];