import Link from "next/link";

export default function Brand() {
  return (
    <Link href="/" className="brand" aria-label="Edify home">
      <span className="brand-badge" aria-hidden="true">e.</span>
      <span className="brand-word">edify</span>
    </Link>
  );
}
