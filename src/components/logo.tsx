export function Logo({
  size = 32,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label="StudEx Valley OS"
    >
      <rect width="64" height="64" rx="12" fill="#0A0A0A" />
      <path d="M12 52 Q32 8 52 52" fill="none" stroke="#C9A84C" strokeWidth="4" />
      <path d="M12 52 Q32 56 52 52" fill="none" stroke="#C9A84C" strokeWidth="2" />
      <circle cx="32" cy="20" r="6" fill="#C9A84C" />
    </svg>
  );
}
