// Small stroke icons drawn inline so no icon library is needed. All are decorative.
type IconProps = { size?: number; className?: string };

function Svg({ size = 16, className, children }: IconProps & { children: React.ReactNode }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" className={className}>
      {children}
    </svg>
  );
}

export const ArrowRight = (props: IconProps) => <Svg {...props}><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></Svg>;
export const ArrowLeft = (props: IconProps) => <Svg {...props}><path d="M19 12H5" /><path d="m11 18-6-6 6-6" /></Svg>;
export const Check = (props: IconProps) => <Svg {...props}><path d="m5 12.5 4.5 4.5L19 7.5" /></Svg>;
export const Bolt = (props: IconProps) => <Svg {...props}><path d="M13 2 4.5 13.5H12L11 22l8.5-11.5H12L13 2Z" /></Svg>;
export const Pencil = (props: IconProps) => <Svg {...props}><path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16v4Z" /><path d="m13.5 6.5 4 4" /></Svg>;
export const Spark = (props: IconProps) => <Svg {...props}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" /></Svg>;
export const Book = (props: IconProps) => <Svg {...props}><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5v-15Z" /><path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5" /></Svg>;
export const Grid = (props: IconProps) => <Svg {...props}><rect x="3" y="3" width="7.5" height="7.5" rx="1.5" /><rect x="13.5" y="3" width="7.5" height="7.5" rx="1.5" /><rect x="3" y="13.5" width="7.5" height="7.5" rx="1.5" /><rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.5" /></Svg>;
export const Layers = (props: IconProps) => <Svg {...props}><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="m3 13 9 5 9-5" /></Svg>;
export const Note = (props: IconProps) => <Svg {...props}><path d="M5 3h10l4 4v14H5V3Z" /><path d="M15 3v4h4" /><path d="M9 12h6M9 16h4" /></Svg>;
export const Users = (props: IconProps) => <Svg {...props}><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20a6.5 6.5 0 0 1 13 0" /><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18.5 20a6.5 6.5 0 0 0-2.8-5.3" /></Svg>;
export const Swap = (props: IconProps) => <Svg {...props}><path d="M7 4 3 8l4 4" /><path d="M3 8h14" /><path d="m17 20 4-4-4-4" /><path d="M21 16H7" /></Svg>;
export const Target = (props: IconProps) => <Svg {...props}><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1" /></Svg>;
export const Shield = (props: IconProps) => <Svg {...props}><path d="M12 3 4.5 6v6c0 4.5 3.2 7.6 7.5 9 4.3-1.4 7.5-4.5 7.5-9V6L12 3Z" /><path d="m9 12 2 2 4-4" /></Svg>;
export const Clock = (props: IconProps) => <Svg {...props}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></Svg>;
export const Flag = (props: IconProps) => <Svg {...props}><path d="M5 21V4" /><path d="M5 4h11l-2 4 2 4H5" /></Svg>;
export const Plus = (props: IconProps) => <Svg {...props}><path d="M12 5v14M5 12h14" /></Svg>;
export const Monitor = (props: IconProps) => <Svg {...props}><rect x="3" y="4" width="18" height="12" rx="2" /><path d="M8 20h8M12 16v4" /><path d="m8.5 10 2 2 4-4" /></Svg>;
