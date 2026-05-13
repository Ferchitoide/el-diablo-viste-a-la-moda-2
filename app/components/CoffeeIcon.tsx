export default function CoffeeIcon({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {/* Steam */}
      <path d="M10 5 C10 5, 11.5 7, 10 9" />
      <path d="M16 3.5 C16 3.5, 17.5 5.5, 16 7.5" />
      <path d="M22 5 C22 5, 23.5 7, 22 9" />
      {/* Cup body */}
      <path d="M5 12 L27 12 L24 25.5 C23.8 26.4 23 27 22.1 27 L9.9 27 C9 27 8.2 26.4 8 25.5 L5 12Z" />
      {/* Handle */}
      <path d="M24 15 C28.5 15, 31 17, 31 19.5 C31 22, 28.5 24, 24 24" />
      {/* Saucer */}
      <line x1="2" y1="29" x2="30" y2="29" />
    </svg>
  );
}
