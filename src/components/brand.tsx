import Link from "next/link";

// Edify's mark: a cream "e." in a tilted red badge wearing a navy graduation cap.
// The cap has a cream edge so it stays visible on navy backgrounds. src/app/icon.svg draws the same mark.
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 58 58" aria-hidden="true" focusable="false">
      <g transform="rotate(-6 24 34)">
        <rect x="4" y="14" width="40" height="40" rx="12" fill="#c1121f" />
        <path d="M14.5 35H31.5A9 9 0 1 0 28.9 41.4" fill="none" stroke="#fdf0d5" strokeWidth="5" strokeLinecap="round" />
        <circle cx="35.5" cy="43.5" r="3" fill="#fdf0d5" />
      </g>
      <g stroke="#fdf0d5" strokeWidth="2" strokeLinejoin="round">
        <path d="M33 13.5v6.5c4.5 2.6 11.5 2.6 16 0v-6.5" fill="#001826" />
        <path d="M26 10.5 41 4l15 6.5-15 6.5z" fill="#003049" />
      </g>
      <path d="M52 12v9" stroke="#669bbc" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="52" cy="22.5" r="2.6" fill="#669bbc" />
    </svg>
  );
}

export default function Brand() {
  return (
    <Link href="/" className="brand" aria-label="Edify home">
      <BrandMark className="brand-mark" />
      <span className="brand-word" aria-hidden="true">
        ed<span className="brand-i">ı<svg viewBox="0 0 24 24" className="brand-star"><path d="M12 1.5l3.1 6.6 7.2.9-5.3 5 1.3 7.1L12 17.6 5.7 21.1 7 14l-5.3-5 7.2-.9z" fill="#c1121f" /></svg></span>fy
      </span>
    </Link>
  );
}
