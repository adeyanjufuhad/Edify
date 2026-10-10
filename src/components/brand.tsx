import Link from "next/link";

export default function Brand() {
  return (
    <Link href="/" className="brand" aria-label="Edify home">
      <span className="brand-word">edify<span>.</span></span>
      <small>SS1 STUDY SPACE</small>
    </Link>
  );
}
