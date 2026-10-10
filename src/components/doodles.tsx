// Hand-drawn style decorations. All purely decorative (aria-hidden).
type DoodleProps = { className?: string; color?: string };

export function Star({ className, color = "#c1121f" }: DoodleProps) {
  return <svg viewBox="0 0 40 40" className={`doodle ${className ?? ""}`} aria-hidden="true"><path d="M20 3l5 11 12 1.5-9 8 2.5 12L20 29.5 9.5 35.5 12 23.5l-9-8L15 14z" fill={color} stroke={color} strokeWidth="2.5" strokeLinejoin="round" /></svg>;
}

export function Sparkle({ className, color = "#669bbc" }: DoodleProps) {
  return <svg viewBox="0 0 40 40" className={`doodle ${className ?? ""}`} aria-hidden="true"><path d="M20 2c2 11 7 16 18 18-11 2-16 7-18 18-2-11-7-16-18-18 11-2 16-7 18-18z" fill={color} /></svg>;
}

export function Squiggle({ className, color = "#c1121f" }: DoodleProps) {
  return <svg viewBox="0 0 120 20" className={`doodle ${className ?? ""}`} aria-hidden="true" preserveAspectRatio="none"><path d="M3 12c10-10 18-10 26 0s18 10 26 0 18-10 26 0 18 10 26 0 10-8 10-8" fill="none" stroke={color} strokeWidth="5" strokeLinecap="round" /></svg>;
}

export function Arrow({ className, color = "#003049" }: DoodleProps) {
  return <svg viewBox="0 0 90 60" className={`doodle ${className ?? ""}`} aria-hidden="true"><path d="M6 10c20 0 50 6 62 36" fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" strokeDasharray="2 9" /><path d="M56 40l13 8 4-15" fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export function Atom({ className, color = "#669bbc" }: DoodleProps) {
  return (
    <svg viewBox="0 0 60 60" className={`doodle ${className ?? ""}`} aria-hidden="true">
      <g fill="none" stroke={color} strokeWidth="3.5"><ellipse cx="30" cy="30" rx="26" ry="10" /><ellipse cx="30" cy="30" rx="26" ry="10" transform="rotate(60 30 30)" /><ellipse cx="30" cy="30" rx="26" ry="10" transform="rotate(-60 30 30)" /></g>
      <circle cx="30" cy="30" r="5" fill="#c1121f" />
    </svg>
  );
}

export function Pencil({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 80 24" className={`doodle ${className ?? ""}`} aria-hidden="true">
      <rect x="10" y="4" width="54" height="16" rx="4" fill="#c1121f" />
      <rect x="4" y="4" width="12" height="16" rx="4" fill="#669bbc" />
      <path d="M64 4l14 8-14 8z" fill="#fdf0d5" stroke="#003049" strokeWidth="2" strokeLinejoin="round" />
      <path d="M74 10l4 2-4 2z" fill="#003049" />
    </svg>
  );
}

// Wavy edge for the top of a coloured section. `fill` is the colour of the section it sits on.
// The path covers two full periods in a box twice as wide as the wrapper, so sliding it by -50% loops seamlessly
// (the drift itself is a reduced-motion-aware animation in src/app/home-motion.css).
export function Wave({ className, fill }: { className?: string; fill: string }) {
  return (
    <div className={`wave-wrap ${className ?? ""}`} aria-hidden="true">
      <svg viewBox="0 0 2880 48" className="wave" preserveAspectRatio="none"><path d="M0 48V24c120-22 240-22 360 0s240 22 360 0 240-22 360 0 240 22 360 0 240-22 360 0 240 22 360 0 240-22 360 0 240 22 360 0v24z" fill={fill} /></svg>
    </div>
  );
}

export function SpeechBubble({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={`speech ${className ?? ""}`}>{children}</div>;
}
