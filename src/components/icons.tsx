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
