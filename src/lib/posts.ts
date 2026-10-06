/** Parses a TikTok or Instagram post URL into what the embed needs. */
export type PostInfo =
  | { platform: "tiktok"; id: string; embedUrl: string; label: "TikTok" }
  | { platform: "instagram"; id: string; embedUrl: string; label: "Instagram" }
  | { platform: "youtube"; id: string; embedUrl: string; label: "YouTube" }
  | null;

export function parsePost(url: string): PostInfo {
  let m = url.match(/tiktok\.com\/@[\w.]+\/video\/(\d+)/);
  if (m) return { platform: "tiktok", id: m[1], embedUrl: `https://www.tiktok.com/embed/v2/${m[1]}`, label: "TikTok" };
  m = url.match(/instagram\.com\/(?:reel|p)\/([\w-]+)/);
  if (m) return { platform: "instagram", id: m[1], embedUrl: `https://www.instagram.com/reel/${m[1]}/embed/`, label: "Instagram" };
  m = url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([\w-]+)/);
  if (m) return { platform: "youtube", id: m[1], embedUrl: `https://www.youtube-nocookie.com/embed/${m[1]}`, label: "YouTube" };
  return null;
}
