import type { Metadata, Viewport } from "next";
import { Fredoka, Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({ subsets: ["latin"], variable: "--font-body" });
const fredoka = Fredoka({ subsets: ["latin"], variable: "--font-display" });

const description = "Clear weekly notes, quick exam summaries and exam-style practice for secondary school students in Nigeria, JSS1 to SS3.";

export const metadata: Metadata = {
  title: "Edify — Study smart. Ace your exams.",
  description,
  openGraph: { title: "Edify — Study smart. Ace your exams.", description, siteName: "Edify", type: "website", locale: "en_NG" },
};

export const viewport: Viewport = { themeColor: "#fdf0d5", colorScheme: "light" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${nunito.variable} ${fredoka.variable}`}>
      <body>
        <a href="#main" className="skip-link">Skip to content</a>
        {children}
      </body>
    </html>
  );
}
