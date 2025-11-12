export const API_BASE = import.meta.env.VITE_API_URL || "https://export-import-server.vercel.app";

export function getImageFallback(url) {
  return url || "https://via.placeholder.com/600x400?text=No+Image";
}


