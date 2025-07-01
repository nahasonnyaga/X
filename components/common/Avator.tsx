export default function Avatar({ src, alt, size = 40 }: { src?: string, alt?: string, size?: number }) {
  return (
    <img
      src={src || "/default-avatar.png"}
      alt={alt || "avatar"}
      className="rounded-full"
      style={{ width: size, height: size }}
    />
  );
}
