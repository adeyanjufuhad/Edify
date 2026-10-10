import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });

export const metadata: Metadata = {
  title: "Edify — Study smart. Ace your exams.",
  description: "Clear weekly notes, quick exam summaries and WAEC-style practice for SS1 learners.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={geist.variable}><body>{children}</body></html>;
}
