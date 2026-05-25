export type MechPalette = {
  body: string;
  accent: string;
  visor: string;
  chest: string;
  metal: string;
  outline: string;
  crest: string;
};

export const MECH_PALETTES: Record<string, MechPalette> = {
  // Main — "Prime": red + blue + gold core
  Main: { body: "#c0392b", accent: "#2e5bba", visor: "#bfeaff", chest: "#c9a84c", metal: "#d9dee5", outline: "#1a1620", crest: "#c9a84c" },
  // Comms — "Bee": yellow + black
  Comms: { body: "#f2c20e", accent: "#1c1c1c", visor: "#2e5bba", chest: "#1c1c1c", metal: "#ffe38a", outline: "#14130a", crest: "#1c1c1c" },
  // Content — "Vivid": brand pink
  Content: { body: "#ff2ec4", accent: "#7a1f63", visor: "#fff0fb", chest: "#c9a84c", metal: "#ffd6f2", outline: "#2e0a26", crest: "#c9a84c" },
  // Ops — "Steel": blue + silver
  Ops: { body: "#2e5bba", accent: "#16324f", visor: "#bfeaff", chest: "#d9dee5", metal: "#aec4e0", outline: "#0c1726", crest: "#d9dee5" },
  // Research — "Sky": white jet + pink visor
  Research: { body: "#e6e9ee", accent: "#97a1ad", visor: "#ff2ec4", chest: "#c9a84c", metal: "#ffffff", outline: "#3a3f47", crest: "#c9a84c" },
};

export function PixelMech({
  palette,
  size = 168,
  className = "",
}: {
  palette: MechPalette;
  size?: number;
  className?: string;
}) {
  const p = palette;
  const o = { stroke: p.outline, strokeWidth: 1.6 };
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 78"
      width={size}
      height={(size * 78) / 64}
      className={`pixelated ${className}`}
      role="img"
      aria-label="agent mech"
    >
      {/* crest / antennae */}
      <rect x="29" y="2" width="6" height="9" fill={p.crest} {...o} />
      <rect x="17" y="5" width="4" height="7" fill={p.crest} {...o} />
      <rect x="43" y="5" width="4" height="7" fill={p.crest} {...o} />

      {/* head */}
      <rect x="18" y="10" width="28" height="18" fill={p.body} {...o} />
      <rect x="22" y="14" width="20" height="12" fill={p.metal} {...o} />
      {/* visor / eyes */}
      <rect x="23" y="17" width="18" height="4" fill={p.visor} />
      <rect x="26" y="23" width="12" height="2" fill={p.outline} />

      {/* neck */}
      <rect x="27" y="28" width="10" height="3" fill={p.metal} {...o} />

      {/* shoulders */}
      <rect x="7" y="31" width="11" height="9" fill={p.accent} {...o} />
      <rect x="46" y="31" width="11" height="9" fill={p.accent} {...o} />

      {/* torso */}
      <rect x="18" y="31" width="28" height="22" fill={p.body} {...o} />
      {/* chest core */}
      <rect x="27" y="36" width="10" height="10" fill={p.chest} {...o} />
      <rect x="30" y="39" width="4" height="4" fill={p.visor} />
      {/* torso vents */}
      <rect x="21" y="48" width="6" height="2" fill={p.outline} />
      <rect x="37" y="48" width="6" height="2" fill={p.outline} />

      {/* arms */}
      <rect x="8" y="40" width="8" height="16" fill={p.accent} {...o} />
      <rect x="48" y="40" width="8" height="16" fill={p.accent} {...o} />
      {/* fists */}
      <rect x="8" y="56" width="8" height="6" fill={p.metal} {...o} />
      <rect x="48" y="56" width="8" height="6" fill={p.metal} {...o} />

      {/* hips */}
      <rect x="20" y="53" width="24" height="5" fill={p.metal} {...o} />

      {/* legs */}
      <rect x="21" y="58" width="9" height="14" fill={p.body} {...o} />
      <rect x="34" y="58" width="9" height="14" fill={p.body} {...o} />
      {/* knee accents */}
      <rect x="22" y="63" width="7" height="3" fill={p.accent} />
      <rect x="35" y="63" width="7" height="3" fill={p.accent} />

      {/* feet */}
      <rect x="17" y="71" width="14" height="6" fill={p.outline} />
      <rect x="33" y="71" width="14" height="6" fill={p.outline} />
    </svg>
  );
}
