// "Edi", Edify's owl mascot, drawn in the brand palette. Decorative unless given a title.
type Pose = "wave" | "read" | "cheer" | "think";

const NAVY = "#003049";
const STEEL = "#669bbc";
const CREAM = "#fdf0d5";
const RED = "#c1121f";
const MAROON = "#780000";

export default function Mascot({ pose = "wave", className, title }: { pose?: Pose; className?: string; title?: string }) {
  const leftWingUp = pose === "cheer";
  const rightWingUp = pose === "wave" || pose === "cheer";

  return (
    <svg viewBox="0 0 220 240" className={`mascot ${className ?? ""}`} role={title ? "img" : undefined} aria-label={title} aria-hidden={title ? undefined : true}>
      {pose === "cheer" && (
        <g fill={RED}>
          <path d="M26 46l5 10 11 2-8 8 2 11-10-5-10 5 2-11-8-8 11-2z" />
          <path d="M188 30l4 8 9 1-6 6 1 9-8-4-8 4 1-9-6-6 9-1z" fill={STEEL} />
          <circle cx="200" cy="96" r="5" />
          <circle cx="18" cy="110" r="4" fill={STEEL} />
        </g>
      )}

      {/* ear tufts */}
      <path d="M52 62 44 20l38 30z" fill={NAVY} />
      <path d="M168 62l8-42-38 30z" fill={NAVY} />

      {/* wings */}
      <g fill={STEEL}>
        {leftWingUp
          ? <path d="M40 130c-22-18-30-48-20-70 14 10 30 34 34 60z" />
          : <path d="M38 118c-18 18-20 50-4 72 10-8 18-34 16-64z" />}
        {rightWingUp
          ? <path d="M180 130c22-18 30-48 20-70-14 10-30 34-34 60z" />
          : <path d="M182 118c18 18 20 50 4 72-10-8-18-34-16-64z" />}
      </g>

      {/* body */}
      <path d="M110 40c50 0 76 36 76 92 0 54-30 90-76 90s-76-36-76-90c0-56 26-92 76-92z" fill={NAVY} />
      {/* belly with feather scallops */}
      <ellipse cx="110" cy="164" rx="48" ry="50" fill={CREAM} />
      <g fill="none" stroke={STEEL} strokeWidth="3.5" strokeLinecap="round">
        <path d="M86 150q6 7 12 0M104 150q6 7 12 0M122 150q6 7 12 0" />
        <path d="M95 168q6 7 12 0M113 168q6 7 12 0" />
        <path d="M104 186q6 7 12 0" />
      </g>

      {/* eyes */}
      <circle cx="82" cy="100" r="27" fill="#fff" />
      <circle cx="138" cy="100" r="27" fill="#fff" />
      {pose === "think" ? (
        <>
          <circle cx="90" cy="92" r="12" fill={NAVY} /><circle cx="146" cy="92" r="12" fill={NAVY} />
          <circle cx="94" cy="88" r="4" fill="#fff" /><circle cx="150" cy="88" r="4" fill="#fff" />
          <path d="M60 68q20-10 40 0" stroke={STEEL} strokeWidth="5" strokeLinecap="round" fill="none" />
        </>
      ) : pose === "cheer" ? (
        <g fill="none" stroke={NAVY} strokeWidth="6" strokeLinecap="round">
          <path d="M68 104q14-16 28 0" /><path d="M124 104q14-16 28 0" />
        </g>
      ) : (
        <>
          <circle cx="86" cy="104" r="13" fill={NAVY} /><circle cx="134" cy="104" r="13" fill={NAVY} />
          <circle cx="90" cy="99" r="4.5" fill="#fff" /><circle cx="138" cy="99" r="4.5" fill="#fff" />
        </>
      )}

      {/* cheeks */}
      <ellipse cx="62" cy="130" rx="9" ry="6" fill={RED} opacity=".55" />
      <ellipse cx="158" cy="130" rx="9" ry="6" fill={RED} opacity=".55" />

      {/* beak */}
      <path d="M110 118l-10 10 10 10 10-10z" fill={RED} />
      {pose === "cheer" && <path d="M98 142q12 12 24 0" stroke={RED} strokeWidth="4" strokeLinecap="round" fill="none" />}

      {/* feet */}
      <g fill={RED}>
        <ellipse cx="90" cy="222" rx="14" ry="7" />
        <ellipse cx="130" cy="222" rx="14" ry="7" />
      </g>

      {/* graduation cap */}
      <path d="M110 22 62 40l48 18 48-18z" fill={MAROON} />
      <path d="M84 48v14c16 8 36 8 52 0V48l-26 10z" fill={MAROON} />
      <path d="M158 40v24" stroke={RED} strokeWidth="4" strokeLinecap="round" />
      <circle cx="158" cy="68" r="6" fill={RED} />

      {pose === "read" && (
        <g>
          <path d="M60 176c18-8 34-8 50 2 16-10 32-10 50-2v40c-18-8-34-8-50 2-16-10-32-10-50-2z" fill={RED} />
          <path d="M110 178v40" stroke={MAROON} strokeWidth="4" />
          <path d="M70 186c10-3 20-3 30 1M70 196c10-3 20-3 30 1M120 187c10-4 20-4 30-1M120 197c10-4 20-4 30-1" stroke={CREAM} strokeWidth="3" strokeLinecap="round" fill="none" />
        </g>
      )}
    </svg>
  );
}
