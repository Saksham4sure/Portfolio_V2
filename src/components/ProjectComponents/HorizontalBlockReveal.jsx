import { useTheme } from "../../context/ThemeContext";

export default function HorizontalBlockReveal({
  children,
  className = "",
  containerClassName = "inline-block",
  blockClassName = "",
  customGradient,
}) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Little dark and majestic color gradient matching the theme
  const defaultGradient = isDark
    ? "linear-gradient(110deg, #0d0b14 0%, #1e1333 25%, #361a5c 50%, #4d2380 75%, #170e2b 100%)"
    : "linear-gradient(110deg, #161024 0%, #291642 40%, #3f1e63 70%, #190f2b 100%)";

  const defaultGlow = isDark
    ? "0 0 25px rgba(77, 35, 128, 0.4), inset 0 0 14px rgba(168, 85, 247, 0.2)"
    : "0 0 18px rgba(63, 30, 99, 0.35)";

  return (
    <div
      className={`block-reveal-container relative overflow-hidden ${containerClassName} ${className}`}
    >
      {/* 1. Content to be revealed */}
      <div
        className="block-reveal-content will-change-transform"
        style={{ opacity: 0 }}
      >
        {children}
      </div>

      {/* 2. Horizontal reveal bar / curtain */}
      <div
        className={`block-reveal-bar absolute inset-0 z-20 pointer-events-none origin-left ${blockClassName}`}
        style={{
          transform: "scaleX(0)",
          background: customGradient || defaultGradient,
          boxShadow: defaultGlow,
        }}
      >
        {/* Luminous leading edge accent for sharp editorial precision */}
        <div
          className="absolute top-0 bottom-0 right-0 w-[2px] pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(168, 85, 247, 0.2) 0%, rgba(216, 180, 254, 0.9) 50%, rgba(168, 85, 247, 0.2) 100%)",
            boxShadow: "0 0 8px rgba(192, 132, 252, 0.8)",
          }}
        />
      </div>
    </div>
  );
}
