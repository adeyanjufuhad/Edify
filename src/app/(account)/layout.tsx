import Link from "next/link";
import Brand from "@/components/brand";
import "./account.css";

export const metadata = { title: "Your family account — Edify" };

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <main id="main" className="account-page">
      <header className="site-header">
        <div className="shell header-inner"><Brand /><Link href="/" className="text-link">Back to home</Link></div>
      </header>
      <div className="shell account-shell">{children}</div>
    </main>
  );
}
