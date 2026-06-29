/**
 * Chinese ink-wash design accents for StudEx Valley OS.
 * Cyberpunk × 水墨 — neon meets brushwork.
 */

/** Vermilion seal/chop (印章) — 學流 brand mark */
export function InkSeal({
  size = 40,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 44 44"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label="學流 seal"
    >
      {/* Cinnabar (朱砂) vermilion ground */}
      <rect x="0" y="0" width="44" height="44" fill="#C41230" />

      {/* Outer frame — traditional double-rule border */}
      <rect x="1.8" y="1.8" width="40.4" height="40.4" fill="none" stroke="#f0ddb8" strokeWidth="1.4" />
      <rect x="4.2" y="4.2" width="35.6" height="35.6" fill="none" stroke="#f0ddb8" strokeWidth="0.6" />

      {/* Corner notches — classic 界格 detail */}
      {[
        [1.8, 1.8], [37.4, 1.8], [1.8, 37.4], [37.4, 37.4]
      ].map(([x, y], i) => (
        <rect key={i} x={x} y={y} width="4.8" height="4.8" fill="#C41230" />
      ))}

      {/* 學 — top character */}
      <text
        x="22"
        y="18"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="16"
        fill="#f0ddb8"
        fontFamily='"Noto Serif SC","Source Han Serif","STSong","STFangsong","FangSong","serif"'
        fontWeight="700"
        letterSpacing="-0.5"
      >
        學
      </text>

      {/* 流 — bottom character */}
      <text
        x="22"
        y="33"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="16"
        fill="#f0ddb8"
        fontFamily='"Noto Serif SC","Source Han Serif","STSong","STFangsong","FangSong","serif"'
        fontWeight="700"
        letterSpacing="-0.5"
      >
        流
      </text>
    </svg>
  );
}

/**
 * Organic horizontal ink-brush stroke.
 * Path mimics hand-painted calligraphic mark — tapers at both ends,
 * slight undulation along the length.
 */
export function BrushStroke({
  width = 180,
  color = "#39ffaa",
  opacity = 0.14,
  className = "",
}: {
  width?: number;
  color?: string;
  opacity?: number;
  className?: string;
}) {
  const w = width;
  return (
    <svg
      viewBox={`0 0 ${w} 14`}
      width={w}
      height={14}
      aria-hidden
      className={className}
      style={{ opacity, display: "block" }}
    >
      {/* Organic brush path — asymmetric Bézier for natural ink feel */}
      <path
        d={`
          M 3,7
          C 8,6 20,2.5 55,2.8
          C 90,3.1 ${w * 0.55},2.4 ${w * 0.72},3.2
          C ${w * 0.83},4 ${w * 0.91},5.2 ${w - 3},7
          C ${w * 0.91},8.8 ${w * 0.83},10.4 ${w * 0.72},10.8
          C ${w * 0.55},11.6 90,11 55,11.2
          C 20,11.5 8,8.2 3,7 Z
        `}
        fill={color}
      />
    </svg>
  );
}

/**
 * Vertical ink-brush stroke — accent for sidebar margins.
 */
export function VerticalBrushStroke({
  height = 100,
  color = "#ff2ec4",
  opacity = 0.12,
  className = "",
}: {
  height?: number;
  color?: string;
  opacity?: number;
  className?: string;
}) {
  const h = height;
  return (
    <svg
      viewBox={`0 0 12 ${h}`}
      width={12}
      height={h}
      aria-hidden
      className={className}
      style={{ opacity, display: "block" }}
    >
      <path
        d={`
          M 6,2
          C 7,6 8.5,${h * 0.18} 8.2,${h * 0.38}
          C 8,${h * 0.5} 8.3,${h * 0.62} 8,${h * 0.82}
          C 7.5,${h * 0.9} 7,${h - 6} 6,${h - 2}
          C 5,${h - 6} 4.5,${h * 0.9} 4,${h * 0.82}
          C 3.7,${h * 0.62} 4,${h * 0.5} 3.8,${h * 0.38}
          C 3.5,${h * 0.18} 5,6 6,2 Z
        `}
        fill={color}
      />
    </svg>
  );
}

/**
 * Hidden SVG defs — ink-wash filter used on .ink-edge cards.
 * Place once at root layout level.
 */
export function InkSVGDefs() {
  return (
    <svg style={{ display: "none", position: "absolute" }} aria-hidden>
      <defs>
        {/* Slight edge-bleed distortion — applied to card borders */}
        <filter id="ink-edge" x="-8%" y="-8%" width="116%" height="116%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.035 0.05"
            numOctaves="3"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="2.5"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
        {/* Ink-wash fog — applied to background texture layer */}
        <filter id="ink-fog" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.012 0.018"
            numOctaves="5"
            seed="4"
            result="fog"
          />
          <feColorMatrix
            in="fog"
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 3 -1.2"
            result="fogMask"
          />
          <feComposite in="SourceGraphic" in2="fogMask" operator="in" />
        </filter>
      </defs>
    </svg>
  );
}

/**
 * Ambient ink-wash fog layer — fixed overlay at z:-1.
 * Two ink pools (top-left vermilion, bottom-right jade) bleeding
 * from corners over the hero image.
 */
export function InkWashFog() {
  return (
    <svg
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        pointerEvents: "none",
        opacity: 0.55,
      }}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        <radialGradient id="inkPoolTL" cx="0%" cy="0%" r="60%" gradientUnits="userSpaceOnUse"
          gradientTransform="translate(0,0) scale(600,500)">
          <stop offset="0%" stopColor="#5a1008" stopOpacity="0.7" />
          <stop offset="60%" stopColor="#3a0a04" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="inkPoolBR" cx="100%" cy="100%" r="60%" gradientUnits="userSpaceOnUse"
          gradientTransform="translate(1440,900) scale(-580,-440)">
          <stop offset="0%" stopColor="#002d1a" stopOpacity="0.65" />
          <stop offset="55%" stopColor="#001a0f" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#inkPoolTL)" />
      <rect width="100%" height="100%" fill="url(#inkPoolBR)" />
    </svg>
  );
}
