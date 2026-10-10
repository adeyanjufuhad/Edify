import type { Metadata, Viewport } from "next";
import { Geist, Outfit } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-display" });

const description = "Clear weekly notes, quick exam summaries and WAEC-style practice for every SS1 subject.";

export const metadata: Metadata = {
  title: "Edify — Study smart. Ace your exams.",
  description,
  openGraph: { title: "Edify — Study smart. Ace your exams.", description, siteName: "Edify", type: "website", locale: "en_NG" },
};

export const viewport: Viewport = { themeColor: "#edf2f4", colorScheme: "light" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} ${outfit.variable}`}>
      <body>
        <a href="#main" className="skip-link">Skip to content</a>
        {children}
      </body>
    </html>
  );
}
