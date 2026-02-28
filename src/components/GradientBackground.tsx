"use client";

/**
 * Diagonal glowing gradient background effect.
 * Light mode: soft flowing iridescent gradient band (red → yellow → blue → purple).
 * Dark mode: luminous diagonal bands - reds/fuchsias from bottom-left, purples/magentas from top-right.
 */
export default function GradientBackground() {
  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden
    >
      {/* Light mode: soft diagonal gradient band (iridescent blur) */}
      <div className="absolute inset-0 dark:hidden">
        <div
          className="absolute -bottom-[40%] -left-[20%] w-[140%] h-[80%] opacity-[0.45]"
          style={{
            background:
              "linear-gradient(135deg, rgba(251, 113, 133, 0.6) 0%, rgba(251, 191, 36, 0.5) 25%, rgba(34, 211, 238, 0.55) 50%, rgba(168, 85, 247, 0.55) 75%, rgba(236, 72, 153, 0.5) 100%)",
            filter: "blur(90px)",
            transform: "rotate(-15deg) skewX(-5deg)",
          }}
        />
        <div
          className="absolute -top-[30%] -right-[15%] w-[100%] h-[70%] opacity-[0.35]"
          style={{
            background:
              "linear-gradient(160deg, rgba(34, 211, 238, 0.45) 0%, rgba(168, 85, 247, 0.45) 50%, rgba(236, 72, 153, 0.35) 100%)",
            filter: "blur(100px)",
            transform: "rotate(10deg)",
          }}
        />
      </div>

      {/* Dark mode: luminous diagonal bands (reds/fuchsias + purples/magentas) */}
      <div className="absolute inset-0 hidden dark:block">
        {/* Left band: reds/fuchsias from bottom-left */}
        <div
          className="absolute bottom-0 left-0 w-[80%] h-[70%] opacity-[0.7]"
          style={{
            background:
              "linear-gradient(135deg, transparent 0%, rgba(236, 72, 153, 0.7) 20%, rgba(219, 39, 119, 0.8) 40%, rgba(190, 24, 93, 0.7) 60%, rgba(136, 19, 55, 0.5) 80%, transparent 100%)",
            filter: "blur(80px)",
            transform: "rotate(-25deg) translateX(-10%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-[60%] h-[60%] opacity-[0.6]"
          style={{
            background:
              "linear-gradient(120deg, transparent 0%, rgba(244, 63, 94, 0.8) 30%, rgba(225, 29, 72, 0.7) 60%, transparent 100%)",
            filter: "blur(100px)",
            transform: "rotate(-20deg) translateX(-15%) translateY(10%)",
          }}
        />

        {/* Right band: purples/magentas from top-right */}
        <div
          className="absolute top-0 right-0 w-[75%] h-[65%] opacity-[0.7]"
          style={{
            background:
              "linear-gradient(315deg, transparent 0%, rgba(168, 85, 247, 0.7) 25%, rgba(192, 132, 252, 0.8) 45%, rgba(79, 70, 229, 0.7) 70%, rgba(67, 56, 202, 0.5) 90%, transparent 100%)",
            filter: "blur(80px)",
            transform: "rotate(25deg) translateX(10%)",
          }}
        />
        <div
          className="absolute top-0 right-0 w-[55%] h-[55%] opacity-[0.6]"
          style={{
            background:
              "linear-gradient(300deg, transparent 0%, rgba(217, 70, 239, 0.8) 35%, rgba(139, 92, 246, 0.7) 65%, transparent 100%)",
            filter: "blur(100px)",
            transform: "rotate(20deg) translateX(15%) translateY(-10%)",
          }}
        />
      </div>
    </div>
  );
}
