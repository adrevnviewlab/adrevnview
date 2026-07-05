import { Link } from "react-router";

const BRAND = {
  navy: "#0F2D4A",
  medium: "#2474BC",
  cyan: "#2EC4E8",
} as const;

type LogoProps = {
  variant?: "full" | "icon";
  theme?: "dark" | "light";
  className?: string;
  iconClassName?: string;
  textClassName?: string;
  link?: boolean;
};

function LogoIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M32 4L8 18V50L8 68H20V50L20 44L32 52V4Z"
        fill={BRAND.medium}
      />
      <path d="M32 4L56 18V52L32 52V4Z" fill={BRAND.navy} />
      <path d="M20 26V44L32 52V34L20 26Z" fill={BRAND.cyan} />
      <path d="M32 34V52L44 44V26L32 34Z" fill={BRAND.medium} />
      <rect x="38" y="46" width="7" height="7" fill={BRAND.cyan} />
    </svg>
  );
}

function LogoWordmark({
  theme,
  className,
}: {
  theme: "dark" | "light";
  className?: string;
}) {
  const primary = theme === "dark" ? "#F1F5F9" : BRAND.navy;

  return (
    <svg
      viewBox="0 0 168 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <text
        x="0"
        y="22"
        fontFamily="Manrope, Inter, Arial, sans-serif"
        fontSize="22"
        fontWeight="700"
        letterSpacing="-0.02em"
      >
        <tspan fill={primary}>Ad</tspan>
        <tspan fill={BRAND.cyan}>R</tspan>
        <tspan fill={primary}>e</tspan>
        <tspan fill={BRAND.cyan}>v</tspan>
        <tspan fill={primary}>n</tspan>
        <tspan fill={primary}>View</tspan>
      </text>
    </svg>
  );
}

export function Logo({
  variant = "full",
  theme = "dark",
  className = "",
  iconClassName = "h-9 w-8 shrink-0",
  textClassName = "h-6 w-auto",
  link = true,
}: LogoProps) {
  const content = (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoIcon className={iconClassName} />
      {variant === "full" && <LogoWordmark theme={theme} className={textClassName} />}
    </span>
  );

  if (!link) return content;

  return (
    <Link to="/" className="inline-flex shrink-0" aria-label="AdRevnView home">
      {content}
    </Link>
  );
}

export function LogoMark({ className = "h-9 w-8" }: { className?: string }) {
  return <LogoIcon className={className} />;
}
