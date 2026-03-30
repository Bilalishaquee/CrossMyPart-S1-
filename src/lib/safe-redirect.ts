/** Only allow same-origin relative paths to prevent open redirects. */
export function safeRedirectPath(candidate: string | null): string {
  if (!candidate || typeof candidate !== "string") return "/search";
  const decoded = (() => {
    try {
      return decodeURIComponent(candidate);
    } catch {
      return candidate;
    }
  })();
  if (!decoded.startsWith("/") || decoded.startsWith("//")) return "/search";
  return decoded;
}
